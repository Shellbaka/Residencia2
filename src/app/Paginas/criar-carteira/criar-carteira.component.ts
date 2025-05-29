import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';  
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
  method: string = 'entropy';
  network: string = 'testnet';
  keyFormat: string = 'p2pkh';

  constructor(private router: Router, private http: HttpClient) {}

  voltar() {
    this.router.navigate(['/carteira']);
  }

  criarCarteira() {
    const payload = {
      method: this.method,
      network: this.network,
      key_format: this.keyFormat,
      mnemonic: null,
      derivation_path: null,
      passphrase: null
    };

    this.http.post<any>('http://127.0.0.1:8000/api/keys/export', payload)
      .subscribe({
        next: (response) => {
          console.log('Resposta recebida no next:', response);
          if (response?.detail?.length) {
            console.error('Erro retornado no corpo:', response.detail);
            alert('Erro ao criar a carteira: ' + JSON.stringify(response.detail));
          } else {
            console.log('Carteira gerada com sucesso:', response);
            alert(`Carteira gerada com endereço: ${response.address}`);
            this.router.navigate(['/carteira']);
          }
        },
        error: (error) => {
          console.error('Erro ao gerar carteira:', error);
          if (error.status === 200) {
            try {
              const json = error.error;
              console.log('JSON retornado (tratado como erro):', json);
              if (json?.detail?.length) {
                alert('Erro ao criar a carteira: ' + JSON.stringify(json.detail));
              } else {
                alert(`Carteira criada com endereço: ${json.address}`);
                this.router.navigate(['/carteira']);
              }
            } catch (e) {
              console.error('Erro ao interpretar a resposta:', e);
              alert('Erro inesperado na criação da carteira.');
            }
          } else {
            alert('Erro ao criar a carteira. Por favor, tente novamente.');
          }
        }
      });
  }
}
