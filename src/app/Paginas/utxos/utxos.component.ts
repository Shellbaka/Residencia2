import { SidebarComponent } from '../../Componentes/sidebar/sidebar.component';
import { HeaderComponent } from '../../Componentes/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-utxos',
  imports: [CommonModule, HeaderComponent, SidebarComponent, FormsModule],
  standalone: true,
  templateUrl: './utxos.component.html',
  styleUrls: ['./utxos.component.css']
})
export class UtxosComponent implements OnInit {
  searchTerm: string = '';
  balance: number = 0;
  errorMessage: string | null = null; 
  address: string = '';                

  utxos = [
    { transacao: 'c47e89c3...', indice: 0, valor: '0,40000000 BTC', address: 'bc1qf2n9f...', confirmations: 10, script: 'OP_HASH10' },
    { transacao: '839a0a97...', indice: 1, valor: '0,20000000 BTC', address: 'bc1qvz4s4...', confirmations: 5, script: 'OP_EQUAL' },
    { transacao: '5e738ea4...', indice: 0, valor: '0,05000000 BTC', address: 'bc1qsithk9...', confirmations: 20, script: 'OP_CHECKSIG' },
    { transacao: '44189f37...', indice: 1, valor: '0,02500000 BTC', address: 'bc1p3umn0...', confirmations: 0, script: 'OP_0' }
  ];

  ngOnInit(): void {
    this.calcularBalance();
  }

  calcularBalance(): void {
    this.balance = this.utxos.reduce((total, utxo) => {
      const numero = parseFloat(utxo.valor.replace(',', '.').split(' ')[0]);
      return total + (isNaN(numero) ? 0 : numero);
    }, 0);
  }

  filteredUtxos() {
    if (!this.searchTerm.trim()) return this.utxos;

    const termo = this.normalizeText(this.searchTerm);

    return this.utxos.filter(utxo =>
      Object.values(utxo).some(value =>
        (typeof value === 'string' || typeof value === 'number') &&
        this.normalizeText(value.toString()).includes(termo)
      )
    );
  }

  normalizeText(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  consultarUTXOs() {
    if (!this.address.trim()) {
      this.errorMessage = 'Por favor, insira um endereço válido.';
      this.utxos = [];
      this.balance = 0;
      return;
    }

    if (this.address.toLowerCase() === 'teste') {
      this.utxos = [
        {
          transacao: 'abc123abc...',
          indice: 0,
          valor: '0,10000000 BTC',
          address: this.address,
          confirmations: 15,
          script: 'OP_DUP OP_HASH160'
        }
      ];
      this.errorMessage = null;
    } else {
      this.utxos = [];
      this.errorMessage = 'Nenhum UTXO encontrado para este endereço.';
    }

    this.calcularBalance();
  }
}
