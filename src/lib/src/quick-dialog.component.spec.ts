import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickDialogComponent } from './quick-dialog.component';

describe('QuickDialogComponent', () => {
  let component: QuickDialogComponent;
  let fixture: ComponentFixture<QuickDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
