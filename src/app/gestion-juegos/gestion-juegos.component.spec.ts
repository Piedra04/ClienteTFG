import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionJuegosComponent } from './gestion-juegos.component';

describe('GestionJuegosComponent', () => {
  let component: GestionJuegosComponent;
  let fixture: ComponentFixture<GestionJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionJuegosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
