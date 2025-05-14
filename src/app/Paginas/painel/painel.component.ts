import { Component } from '@angular/core';
import { SidebarComponent } from '../../Componentes/sidebar/sidebar.component';
import { HeaderComponent } from '../../Componentes/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent],
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent {
  selectedSection = 'Painel';

  onMenuChange(section: string) {
    this.selectedSection = section;
  }
}
