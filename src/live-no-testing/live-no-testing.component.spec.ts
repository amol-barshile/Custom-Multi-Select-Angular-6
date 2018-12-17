import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveNoTestingComponent } from './live-no-testing.component';

describe('LiveNoTestingComponent', () => {
  let component: LiveNoTestingComponent;
  let fixture: ComponentFixture<LiveNoTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LiveNoTestingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveNoTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
