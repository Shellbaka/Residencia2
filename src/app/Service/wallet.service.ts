import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap, switchMap } from 'rxjs/operators';

export interface Wallet {
  id?: number;
  name: string;
  description?: string;
  address: string;
  private_key?: string;
  public_key?: string;
  key_type?: string;
  format?: string; 
  derivation_path?: string; 
  mnemonic?: string; 
  tipo?: string; 
  network: string;
  created_at?: string;
  updated_at?: string;
}

export interface UTXO {
  id?: number;
  wallet_id?: number;
  txid: string;
  vout: number;
  amount: number;
  scriptPubKey?: string;
  script_pubkey?: string;
  address?: string;
  confirmations?: number;
  spendable?: boolean;
}

export interface Transaction {
  id: number;
  wallet_id: number;
  txid: string;
  amount: number;
  fee: number;
  type: string;
  status: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }
  
  createTransaction(transactionData: {
    fromAddress: string;
    toAddress: string;
    amount: number; 
    feeRate: number;
  }): Observable<any> {
    console.log('Tentando criar transação diretamente com endereço de origem');
    
    const directTxRequest = {
      from_address: transactionData.fromAddress,
      outputs: [{
        address: transactionData.toAddress,
        value: Math.floor(transactionData.amount)
      }],
      fee_rate: transactionData.feeRate
    };
    
    console.log('Requisição direta para tx/build:', directTxRequest);
    
    return this.http.post(`${this.apiUrl}/tx/build`, directTxRequest).pipe(
      catchError(error => {
        console.log('Erro na criação direta de transação, tentando com UTXOs:', error);
        
        return this.getUtxos(transactionData.fromAddress).pipe(
          switchMap((utxos: any[]) => {
            console.log('UTXOs disponíveis:', utxos);
            
            if (!utxos || utxos.length === 0) {
              throw new Error('Não há UTXOs disponíveis para esta carteira');
            }
            
            const inputs = utxos.map(utxo => ({
              txid: utxo.txid,
              vout: utxo.vout,
              value: parseInt(utxo.amount), 
              address: transactionData.fromAddress
            }));
            
            const txRequest = {
              inputs: inputs,
              outputs: [{
                address: transactionData.toAddress,
                value: Math.floor(transactionData.amount) 
              }],
              fee_rate: transactionData.feeRate
            };
            
            console.log('Requisição formatada para tx/build:', txRequest);
            
            return this.http.post(`${this.apiUrl}/tx/build`, txRequest);
          })
        );
      }),
      tap((response: any) => {
        console.log('Transaction creation response:', response);
      }),
      retry(1),
      catchError(this.handleError)
    );
  }

  getWallets(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(`${this.apiUrl}/wallets`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getWallet(address: string): Observable<Wallet> {
    return this.http.get<Wallet>(`${this.apiUrl}/wallets/${address}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  saveWallet(wallet: Wallet): Observable<Wallet> {
    return this.http.post<Wallet>(`${this.apiUrl}/wallets`, wallet)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteWallet(address: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/wallets/${address}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getTransactions(address: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/wallets/${address}/transactions`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getUtxos(address: string): Observable<UTXO[]> {
    console.log(`Requesting UTXOs from: ${this.apiUrl}/wallets/${address}/utxos`);
    return this.http.get<UTXO[]>(`${this.apiUrl}/wallets/${address}/utxos`)
      .pipe(
        tap((response: any) => {
          console.log('UTXO response:', response);
          if (!response || !Array.isArray(response)) {
            console.warn('Invalid UTXO response format. Expected array but got:', typeof response);
          } else if (response.length > 0) {
            console.log('First UTXO sample:', response[0]);
          }
        }),
        retry(1),
        catchError(this.handleError)
      );
  }

  getBalance(address: string): Observable<any> {
    console.log(`Requesting balance from: ${this.apiUrl}/balance/${address}`);
    return this.http.get(`${this.apiUrl}/balance/${address}`)
      .pipe(
        tap((response: any) => {
          console.log('Balance response:', response);
          if (!response || 
              (typeof response !== 'object' && typeof response !== 'number') || 
              (typeof response === 'object' && 
               !response.confirmed && 
               !response.balance && 
               response.confirmed !== 0 && 
               response.balance !== 0)) {
            console.warn('Potentially invalid balance response format:', response);
          }
        }),
        retry(1),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    
    if (error.error && typeof error.error === 'object' && error.error.message) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message || 'Unknown error'}`;
      
      if (error.status === 400 && error.error && typeof error.error === 'object') {
        if (error.error.detail && error.error.detail.includes('bitcoinlib')) {
          errorMessage += '\nPossible bitcoinlib compatibility issue detected.';
        }
      }
    }
    
    console.error('HTTP Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
