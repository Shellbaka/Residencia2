import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../Componentes/header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-criar-carteira',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './criar-carteira.component.html',
  styleUrls: ['./criar-carteira.component.css']
})
export class CriarCarteiraComponent {
  nomeCarteira: string = '';
  saldoInicial: string = '';

  constructor(private router: Router) {}

  voltar() {
    this.router.navigate(['/carteiras']);
  }

  criarCarteira() {
    // Aqui pode ser adicionada lógica de envio para API ou localStorage
    console.log('Carteira criada:', this.nomeCarteira, this.saldoInicial);
    alert('Carteira criada com sucesso!');
    this.router.navigate(['/carteiras']);
  }
}
