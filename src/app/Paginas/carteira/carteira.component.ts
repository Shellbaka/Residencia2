import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../Componentes/sidebar/sidebar.component';
import { HeaderComponent } from '../../Componentes/header/header.component';

@Component({
  selector: 'app-carteira',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent],
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.css']
})
export class CarteiraComponent {
  carteiras = [
    { nome: 'Carteira 1', saldo: '0,80000000 BTC' },
    { nome: 'Carteira 2', saldo: '0,00000000 BTC' },
    { nome: 'Carteira 3', saldo: '0,10000000 BTC' }
  ];
}
