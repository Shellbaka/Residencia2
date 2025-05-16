import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../Componentes/header/header.component';

@Component({
  standalone: true,
  
  selector: 'app-exportar-carteira',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './exportar-carteira.component.html',
  styleUrls: ['./exportar-carteira.component.css']
})
export class ExportarCarteiraComponent {
  chaveExportada: string = 'e3k4j9x5g7b2m...';

  copiarChave() {
    navigator.clipboard.writeText(this.chaveExportada);
    alert('Chave copiada!');
  }
}
