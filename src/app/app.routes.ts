import { Routes } from '@angular/router';
import { PainelComponent } from './Paginas/painel/painel.component';
import { HistoricoComponent } from './Paginas/historicotrans/historicotrans.component';
import { CriarTransacaoComponent } from './Paginas/criar-transacao/criar-transacao.component';
import { CarteiraComponent } from './Paginas/carteira/carteira.component';
import { UtxosComponent } from './Paginas/utxos/utxos.component';

export const routes: Routes = [
  { path: '', component: PainelComponent },
  { path: 'historico', component: HistoricoComponent },
  { path: 'criar-transacao', component: CriarTransacaoComponent },
  { path: 'carteira' , component: CarteiraComponent },
  {path : 'utxos', component: UtxosComponent}
];
