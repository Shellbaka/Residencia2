import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Router } from '@angular/router';  
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../Componentes/header/header.component';
import { SidebarComponent } from '../../Componentes/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-exportar-carteira',
  imports: [CommonModule, HeaderComponent, SidebarComponent, FormsModule],
  templateUrl: './exportar-carteira.component.html',
  styleUrls: ['./exportar-carteira.component.css']
})
export class ExportarCarteiraComponent implements OnInit {
  errorMessage: string = '';
  hasValidWallet: boolean = false;
  chaveExportada: string = ''; 
  outputPath: string = ''; 
  method: string = 'entropy';

  privateKey: string = '';
  publicKey: string = '';
  address: string = '';
  network: string = 'testnet';
  keyFormat: string = 'p2pkh';
  fileFormat: string = 'txt';

  constructor(private http: HttpClient, private router: Router) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state && nav.extras.state['walletData']) {
      const walletData = nav.extras.state['walletData'];
      this.privateKey = walletData.private_key;
      this.publicKey = walletData.public_key;
      this.address = walletData.address;
      this.network = walletData.network || this.network;
      this.keyFormat = walletData.key_format || this.keyFormat;
      this.hasValidWallet = true;
    } else {
      this.errorMessage = 'Nenhuma carteira disponível para exportar. Volte e crie uma carteira primeiro.';
    }
  }
  
  ngOnInit() {
    if (!this.hasValidWallet) {
      this.router.navigate(['/criar-carteira']);
    }
  }

  exportarChave() {
    const payload = {
      private_key: this.privateKey,
      public_key: this.publicKey,
      address: this.address,
      network: this.network,
      format: this.keyFormat,
      file_format: this.fileFormat
    };

    this.http.post<any>('http://127.0.0.1:8000/api/keys/export-file', payload, { observe: 'response' })
      .subscribe({
        next: (response) => {
          if (response.status === 200 && response.body?.file_path) {
            this.errorMessage = '';
            this.chaveExportada = `Arquivo salvo em: ${response.body.file_path}`;
          } else {
            this.errorMessage = `Exportação concluída com status ${response.status}.`;
          }
        },
        error: (error) => {
          console.error('Erro ao exportar chave:', error);
          if (error.status === 422) {
            this.errorMessage = 'Erro ao exportar: dados inválidos ou falha na exportação.';
          } else {
            this.errorMessage = 'Erro inesperado ao exportar a chave. Tente novamente.';
          }
        }
      });
  }

  copiarChave() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.chaveExportada);
      this.errorMessage = 'Chave copiada!';
    }
  }
  
  /**
   * Copia o texto de um input para a área de transferência
   * @param inputElement O elemento input que contém o texto a ser copiado
   */
  copiarTexto(inputElement: HTMLInputElement): void {
    if (inputElement && typeof document !== 'undefined') {
      inputElement.select();
      document.execCommand('copy');
      this.errorMessage = 'Copiado para a área de transferência!';
    }
  }

  voltar() {
    this.router.navigate(['/carteira']);
  }
}
