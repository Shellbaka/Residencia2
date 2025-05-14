import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../Componentes/sidebar/sidebar.component';
import { HeaderComponent } from '../../Componentes/header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-criar-transacao',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent, FormsModule],
  templateUrl: './criar-transacao.component.html',
  styleUrls: ['./criar-transacao.component.css']
})
export class CriarTransacaoComponent {
  origem: string = '';
  destino: string = '';
  taxa: string = 'automatica';
  tamanho: number = 200;

  get taxaCalculada(): string {
    switch (this.taxa) {
      case 'baixa':
        return '0.00000100 BT';
      case 'media':
        return '0.00000150 BT';
      default:
        return '0.00000200 BT';
    }
  }

  cancelar() {
    this.origem = '';
    this.destino = '';
    this.taxa = 'automatica';
    this.tamanho = 200;
  }

  enviar() {
    console.log('Transação enviada:', {
      origem: this.origem,
      destino: this.destino,
      taxa: this.taxa,
      tamanho: this.tamanho,
      taxaCalculada: this.taxaCalculada
    });
    alert('Transação enviada com sucesso!');
  }
}
