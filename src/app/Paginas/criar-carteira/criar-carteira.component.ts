import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../Componentes/header/header.component';
import { SidebarComponent } from '../../Componentes/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { WalletService, Wallet } from '../../Service/wallet.service';

@Component({
  selector: 'app-criar-carteira',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, FormsModule],
  templateUrl: './criar-carteira.component.html',
  styleUrls: ['./criar-carteira.component.css']
})
export class CriarCarteiraComponent {
  nomeCarteira: string = '';
  method: string = 'entropy';
  network: string = 'testnet';
  keyFormat: string = 'p2pkh';

  createdWalletData: any = null;
  salvandoLocalmente = false;
  erroDeSalvamento = '';

  constructor(private router: Router, private http: HttpClient, private walletService: WalletService) {}

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

    this.http.post<any>('http://127.0.0.1:8000/api/keys', payload)
      .subscribe({
        next: (response) => {
          if (response && response.address && response.private_key && response.public_key) {
            this.createdWalletData = response;
            
            this.salvarCarteira(response);

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
  
  salvarCarteira(walletData: any) {
    this.salvandoLocalmente = true;
    this.erroDeSalvamento = '';
    
    const walletLocal: Wallet = {
      name: this.nomeCarteira,
      address: walletData.address,
      public_key: walletData.public_key,
      format: walletData.format,
      network: walletData.network,
      derivation_path: walletData.derivation_path,
      mnemonic: walletData.mnemonic
    };
    
    this.walletService.saveWallet(walletLocal).subscribe({
      next: (result) => {
        this.salvandoLocalmente = false;
        alert(`Carteira "${this.nomeCarteira}" criada e salva localmente com sucesso!`);
        this.router.navigate(['/exportar-carteira'], { state: { walletData: this.createdWalletData } });
      },
      error: (err) => {
        this.salvandoLocalmente = false;
        this.erroDeSalvamento = 'Erro ao salvar carteira localmente. Os dados da carteira foram gerados, mas não foram salvos no banco de dados local.';
        console.error('Erro ao salvar carteira localmente:', err);
        
        if (confirm('Ocorreu um erro ao salvar a carteira localmente. Deseja continuar para exportar os dados da carteira?')) {
          this.router.navigate(['/exportar-carteira'], { state: { walletData: this.createdWalletData } });
        }
      }
    });
  }
}
