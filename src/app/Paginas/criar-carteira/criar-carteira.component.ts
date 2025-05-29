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

  createdWalletData: any = null;

  constructor(private router: Router, private http: HttpClient) {}

  voltar() {
    this.router.navigate(['/carteira']);
  }

  criarCarteira() {
    if (!this.nomeCarteira.trim()) {
      alert('Por favor, informe o nome da carteira.');
      return;
    }

    const payload = {
      method: this.method,
      network: this.network,
      key_format: this.keyFormat,
      mnemonic: null,
      derivation_path: null,
      passphrase: null
    };

    this.http.post<any>('http://127.0.0.1:8000/api/keys/create', payload)
      .subscribe({
        next: (response) => {
          if (response && response.address && response.private_key && response.public_key) {
            this.createdWalletData = response;

            alert(`Carteira criada com endereço: ${response.address}`);

            this.router.navigate(['/exportar-carteira'], { state: { walletData: this.createdWalletData } });
          } else {
            alert('Resposta inesperada ao criar carteira.');
          }
        },
        error: (error) => {
          console.error('Erro ao criar carteira:', error);
          alert('Erro ao criar carteira. Tente novamente.');
        }
      });
  }
}
