import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaTorneosComponent } from './vista-torneos.component';

describe('VistaTorneosComponent', () => {
  let component: VistaTorneosComponent;
  let fixture: ComponentFixture<VistaTorneosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaTorneosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaTorneosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
