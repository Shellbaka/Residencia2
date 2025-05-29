import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Router } from '@angular/router';  
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../Componentes/header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-exportar-carteira',
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './exportar-carteira.component.html',
  styleUrls: ['./exportar-carteira.component.css']
})
export class ExportarCarteiraComponent {
  chaveExportada: string = ''; 
  method: string = 'entropy';
network: string = 'testnet';
keyFormat: string = 'p2pkh';
outputPath: string = '';


  constructor(private http: HttpClient, private router: Router) {}

  exportarChave() {
    const payload = {
      tipo: 'exportar',
      formato: 'txt'
    };

    this.http.post<any>('http://127.0.0.1:8000/api/keys/export', payload, { observe: 'response' })
      .subscribe({
        next: (response) => {
          if (response.status === 200) {
            const chave = response.body?.chave || 'Chave não informada.';
            this.chaveExportada = chave;

            const blob = new Blob([chave], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'chave_exportada.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            alert('Exportação bem-sucedida! O arquivo foi salvo.');
          } else {
            alert(`Exportação concluída com status ${response.status}.`);
          }
        },
        error: (error) => {
          console.error('Erro ao exportar chave:', error);
          if (error.status === 422) {
            alert('Erro ao exportar: dados inválidos ou falha na exportação.');
          } else {
            alert('Erro inesperado ao exportar a chave. Tente novamente.');
          }
        }
      });
  }

  copiarChave() {
    navigator.clipboard.writeText(this.chaveExportada);
    alert('Chave copiada!');
  }

  voltar() {
    this.router.navigate(['/carteira']);
  }
}
