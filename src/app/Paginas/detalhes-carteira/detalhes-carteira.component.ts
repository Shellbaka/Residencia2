import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../Componentes/header/header.component';

@Component({
  standalone: true,
  selector: 'app-detalhes-carteira',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './detalhes-carteira.component.html',
  styleUrls: ['./detalhes-carteira.component.css']
})
export class DetalhesCarteiraComponent {
  nomeCarteira: string = 'Carteira 1';
  saldo: number = 0.8;
  endereco: string = '3EpJ55r#DKF...';
  chavePrivada: string = 'Kxb9CAsnLdn...';
}
