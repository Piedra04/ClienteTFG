import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaJuegosComponent } from './vista-juegos.component';

describe('VistaJuegosComponent', () => {
  let component: VistaJuegosComponent;
  let fixture: ComponentFixture<VistaJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaJuegosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
