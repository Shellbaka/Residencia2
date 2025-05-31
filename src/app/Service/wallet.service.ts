import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Wallet {
  id?: number;
  name: string;
  address: string;
  public_key: string;
  format: string;
  network: string;
  derivation_path?: string;
  mnemonic?: string;
  created_at?: string;
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

export interface UTXO {
  id: number;
  wallet_id: number;
  txid: string;
  vout: number;
  amount: number;
  script_pubkey: string;
  confirmations: number;
  spendable: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getWallets(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(`${this.apiUrl}/wallets`);
  }

  getWallet(address: string): Observable<Wallet> {
    return this.http.get<Wallet>(`${this.apiUrl}/wallets/${address}`);
  }

  saveWallet(wallet: Wallet): Observable<Wallet> {
    return this.http.post<Wallet>(`${this.apiUrl}/wallets`, wallet);
  }

  deleteWallet(address: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/wallets/${address}`);
  }

  getTransactions(address: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/wallets/${address}/transactions`);
  }

  getUtxos(address: string): Observable<UTXO[]> {
    return this.http.get<UTXO[]>(`${this.apiUrl}/wallets/${address}/utxos`);
  }

  getBalance(address: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/balance/${address}`);
  }
}
