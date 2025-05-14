import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() selected = new EventEmitter<string>();

  menu = ['Painel', 'Histórico de transações', 'Criar transação', 'Carteiras', 'UTXOs', 'Console', 'Configurações'];

  selectItem(item: string) {
    this.selected.emit(item);
  }
}
