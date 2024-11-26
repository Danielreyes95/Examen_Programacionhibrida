import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfirmacionEliminacionComponent } from './confirmacion-eliminacion.component';

describe('ConfirmacionEliminacionComponent', () => {
  let component: ConfirmacionEliminacionComponent;
  let fixture: ComponentFixture<ConfirmacionEliminacionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ConfirmacionEliminacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmacionEliminacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
