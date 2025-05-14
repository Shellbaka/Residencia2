import { Routes } from '@angular/router';
import { PainelComponent } from './Paginas/painel/painel.component';
import { HistoricoComponent } from './Paginas/historicotrans/historicotrans.component';
import { CriarTransacaoComponent } from './Paginas/criar-transacao/criar-transacao.component';
import { CarteiraComponent } from './Paginas/carteira/carteira.component';
import { UtxosComponent } from './Paginas/utxos/utxos.component';
import { ConfiguracaoComponent } from './Paginas/configuracao/configuracao.component';
import { CriarCarteiraComponent } from './Paginas/criar-carteira/criar-carteira.component';
import { ExportarTransacoesComponent } from './Paginas/exportar-transacoes/exportar-transacoes.component';
import { ExportarUtxosComponent } from './Paginas/exportar-utxos/exportar-utxos.component';

export const routes: Routes = [
  { path: '', component: PainelComponent },
  { path: 'historico', component: HistoricoComponent },
  { path: 'criar-transacao', component: CriarTransacaoComponent },
  { path: 'carteira' , component: CarteiraComponent },
  {path : 'utxos', component: UtxosComponent},
   {path : 'configuracoes', component: ConfiguracaoComponent},
  {path : 'criar-carteira', component: CriarCarteiraComponent},
  {path : 'exportar-transacoes', component: ExportarTransacoesComponent},
  {path : 'exportar-utxos', component: ExportarUtxosComponent},
];
