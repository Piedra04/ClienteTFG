import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCampeonatosComponent } from './gestion-campeonatos.component';

describe('GestionCampeonatosComponent', () => {
  let component: GestionCampeonatosComponent;
  let fixture: ComponentFixture<GestionCampeonatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionCampeonatosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCampeonatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
