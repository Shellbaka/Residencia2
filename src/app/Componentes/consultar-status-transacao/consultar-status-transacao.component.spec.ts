import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarStatusTransacaoComponent } from './consultar-status-transacao.component';

describe('ConsultarStatusTransacaoComponent', () => {
  let component: ConsultarStatusTransacaoComponent;
  let fixture: ComponentFixture<ConsultarStatusTransacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarStatusTransacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarStatusTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
