import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HistoricoComponent } from './Paginas/historicotrans/historicotrans.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HistoricoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'residenciaBB';
}
