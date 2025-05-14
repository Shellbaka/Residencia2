import { Routes } from '@angular/router';
import { PainelComponent } from './Paginas/painel/painel.component';
import { HistoricoComponent } from './Paginas/historicotrans/historicotrans.component';

export const routes: Routes = [
  { path: '', component: PainelComponent },
  { path: 'historico', component: HistoricoComponent },
];
