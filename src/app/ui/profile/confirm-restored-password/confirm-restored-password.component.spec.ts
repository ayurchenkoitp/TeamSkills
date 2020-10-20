import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRestoredPasswordComponent } from './confirm-restored-password.component';

describe('ConfirmRestoredPasswordComponent', () => {
  let component: ConfirmRestoredPasswordComponent;
  let fixture: ComponentFixture<ConfirmRestoredPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmRestoredPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRestoredPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
