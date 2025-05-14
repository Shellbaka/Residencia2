import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../Componentes/sidebar/sidebar.component';
import { HeaderComponent } from '../../Componentes/header/header.component';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent],
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent {
  transacoes = [
    { data: '17/04/2024 15:20', endereco: 'bdecb4a30....51520c', valor: '0,50000000 BTC', status: 'Confirmada' },
    { data: '17/04/2024 09:37', endereco: 'bc1ap19mk....9p5ymk', valor: '1,20000000 BTC', status: 'Confirmada' },
    { data: '16/04/2024 18:50', endereco: 'bc1q26ph0....gcyct04', valor: '0,30000000 BTC', status: 'Falhou' },
    { data: '15/04/2024 12:20', endereco: 'bc1qn26hxc....3ge3t0', valor: '0,00000000 BTC', status: 'Confirmada' },
    { data: '14/04/2024 08:00', endereco: 'bc1ch4p4zp....vyxfg7', valor: '2,00000000 BTC', status: 'Falhou' },
  ];
}
