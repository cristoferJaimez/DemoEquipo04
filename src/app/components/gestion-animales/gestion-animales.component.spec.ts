import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAnimalesComponent } from './gestion-animales.component';

describe('GestionAnimalesComponent', () => {
  let component: GestionAnimalesComponent;
  let fixture: ComponentFixture<GestionAnimalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionAnimalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionAnimalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
