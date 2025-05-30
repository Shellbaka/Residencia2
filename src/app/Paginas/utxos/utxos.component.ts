import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../Componentes/sidebar/sidebar.component';
import { HeaderComponent } from '../../Componentes/header/header.component';

interface UTXO {
  txid: string;
  vout: number;
  value: number; 
  address: string;
  confirmations: number;
  script?: string;
  selected?: boolean;
}

@Component({
  selector: 'app-utxos',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, FormsModule],
  templateUrl: './utxos.component.html',
  styleUrls: ['./utxos.component.css']
})
export class UtxosComponent implements OnInit {
  searchTerm: string = '';
  balance: number = 0; 
  errorMessage: string | null = null;
  address: string = '';

  utxos: UTXO[] = [];

  consultaFinalizada: boolean = false;

  ngOnInit(): void {
    this.consultaFinalizada = false;
    this.carregarUTXOsIniciais();
  }

  carregarUTXOsIniciais(): void {
    this.utxos = [
      { txid: 'c47e89c3...', vout: 0, value: 40000000, address: 'bc1qf2n9f...', confirmations: 10, script: 'OP_HASH10', selected: false },
      { txid: '839a0a97...', vout: 1, value: 20000000, address: 'bc1qvz4s4...', confirmations: 5, script: 'OP_EQUAL', selected: false },
      { txid: '5e738ea4...', vout: 0, value: 5000000, address: 'bc1qsithk9...', confirmations: 20, script: 'OP_CHECKSIG', selected: false },
      { txid: '44189f37...', vout: 1, value: 2500000, address: 'bc1p3umn0...', confirmations: 0, script: 'OP_0', selected: false }
    ];
    this.calcularBalance();
  }

  calcularBalance(): void {
    const totalSatoshis = this.utxos.reduce((total, utxo) => total + utxo.value, 0);
    this.balance = totalSatoshis / 100000000; 
  }

  filteredUtxos(): UTXO[] {
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
      this.consultaFinalizada = true;
      return;
    }

    if (this.address.toLowerCase() === 'teste') {
      this.utxos = [
        {
          txid: 'abc123abc...',
          vout: 0,
          value: 10000000,
          address: this.address,
          confirmations: 15,
          script: 'OP_DUP OP_HASH160',
          selected: false
        }
      ];
      this.errorMessage = null;
    } else {
      this.utxos = [];
      this.errorMessage = 'Nenhum UTXO encontrado para este endereço.';
    }

    this.calcularBalance();
    this.consultaFinalizada = true;
  }

  resetarConsulta() {
    this.address = '';
    this.searchTerm = '';
    this.errorMessage = null;
    this.consultaFinalizada = false;
    this.carregarUTXOsIniciais();
  }

  exportarUTXOs() {
    const dados = JSON.stringify(this.utxos, null, 2);
    const blob = new Blob([dados], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'utxos.json';
    a.click();

    URL.revokeObjectURL(url);
  }

  getSelectedUTXOs(): UTXO[] {
    return this.utxos.filter(u => u.selected);
  }
}
