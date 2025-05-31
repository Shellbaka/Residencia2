import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() selected = new EventEmitter<string>();

  menu = [
    { name: 'Painel', route: '/' },
    { name: 'Histórico de transações', route: '/historico' },
    { name: 'Criar transação', route: '/criar-transacao' },
    { name: 'Carteiras', route: '/carteira' },
    { name: 'UTXOs', route: '/utxos' },
    { name: 'Configurações', route: '/configuracoes' }
  ];

  constructor(private router: Router) {}

  selectItem(item: any) {
    this.selected.emit(item.name);
    this.router.navigate([item.route]);
  }
}
