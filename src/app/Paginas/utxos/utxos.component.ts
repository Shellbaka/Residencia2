import { Component } from '@angular/core';
import { SidebarComponent } from '../../Componentes/sidebar/sidebar.component';
import { HeaderComponent } from '../../Componentes/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-utxos',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent, FormsModule],
  templateUrl: './utxos.component.html',
  styleUrls: ['./utxos.component.css']
})
export class UtxosComponent {
  searchTerm: string = '';

  utxos = [
    { transacao: 'c47e89c3...', indice: 0, valor: '0,40000000 BTC', endereco: 'bc1qf2n9f...', script: 'OP_HASH10' },
    { transacao: '839a0a97...', indice: 1, valor: '0,20000000 BTC', endereco: 'bc1qvz4s4...', script: 'OP_EQUAL' },
    { transacao: '5e738ea4...', indice: 0, valor: '0,05000000 BTC', endereco: 'bc1qsithk9...', script: 'OP_CHECKSIG' },
    { transacao: '44189f37...', indice: 1, valor: '0,02500000 BTC', endereco: 'bc1p3umn0...', script: 'OP_0' },
  ];

  filteredUtxos() {
    if (!this.searchTerm.trim()) return this.utxos;

    return this.utxos.filter(utxo =>
      Object.values(utxo).some(value =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }
}
