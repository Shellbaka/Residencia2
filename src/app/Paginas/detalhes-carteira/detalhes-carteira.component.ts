import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../Componentes/header/header.component';
import { SidebarComponent } from '../../Componentes/sidebar/sidebar.component';
import { WalletService, Wallet, Transaction, UTXO } from '../../Service/wallet.service';
import { DOCUMENT } from '@angular/common';  
import { Inject } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-detalhes-carteira',
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  templateUrl: './detalhes-carteira.component.html',
  styleUrls: ['./detalhes-carteira.component.css']
})
export class DetalhesCarteiraComponent implements OnInit {
  nomeCarteira: string = '';
  endereco: string = '';
  saldo: number = 0;
  
  carteira: Wallet | null = null;
  transacoes: Transaction[] = [];
  utxos: UTXO[] = [];
  saldoAtual: number = 0;
  carregandoCarteira = true;
  carregandoTransacoes = true;
  carregandoUTXOs = true;
  carregandoSaldo = true;
  erro = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private walletService: WalletService,
    @Inject(DOCUMENT) private document: Document
  ) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const address = params['address'];
      if (address) {
        this.carregarDetalhesCarteira(address);
      } else {
        this.erro = 'Endereço da carteira não fornecido';
        this.carregandoCarteira = false;
      }
    });
  }
  
  carregarDetalhesCarteira(address: string): void {
    this.walletService.getWallet(address).subscribe({
      next: (data) => {
        this.carteira = data;
        this.carregandoCarteira = false;
        
        this.nomeCarteira = data.name;
        this.endereco = data.address;
        
        this.carregarTransacoes(address);
        this.carregarUTXOs(address);
        this.carregarSaldo(address);
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes da carteira:', err);
        this.erro = 'Erro ao carregar detalhes da carteira. Verifique se o servidor está rodando.';
        this.carregandoCarteira = false;
      }
    });
  }
  
  carregarTransacoes(address: string): void {
    this.walletService.getTransactions(address).subscribe({
      next: (data) => {
        this.transacoes = data;
        this.carregandoTransacoes = false;
      },
      error: (err) => {
        console.error('Erro ao carregar transações:', err);
        this.carregandoTransacoes = false;
      }
    });
  }
  
  carregarUTXOs(address: string): void {
    this.walletService.getUtxos(address).subscribe({
      next: (data) => {
        this.utxos = data;
        this.carregandoUTXOs = false;
      },
      error: (err) => {
        console.error('Erro ao carregar UTXOs:', err);
        this.carregandoUTXOs = false;
      }
    });
  }
  
  carregarSaldo(address: string): void {
    this.walletService.getBalance(address).subscribe({
      next: (data) => {
        if (data && data.confirmed) {
          this.saldoAtual = data.confirmed;
          this.saldo = data.confirmed; 
        }
        this.carregandoSaldo = false;
      },
      error: (err) => {
        console.error('Erro ao carregar saldo:', err);
        this.carregandoSaldo = false;
      }
    });
  }
  
  voltarParaCarteiras(): void {
    this.router.navigate(['/carteira']);
  }
  
  exportarCarteira(): void {
    if (this.carteira) {
      this.router.navigate(['/exportar-carteira'], { queryParams: { address: this.carteira.address } });
    }
  }
  
  /**
   * @param inputElement O elemento input que contém o texto a ser copiado
   */
  copiarTexto(inputElement: HTMLInputElement): void {
    if (inputElement) {
      inputElement.select();
      document.execCommand('copy');
      alert('Copiado para a área de transferência!');
    }
  }
}
