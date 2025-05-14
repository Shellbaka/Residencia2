import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarTransacaoComponent } from './criar-transacao.component';

describe('CriarTransacaoComponent', () => {
  let component: CriarTransacaoComponent;
  let fixture: ComponentFixture<CriarTransacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarTransacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
