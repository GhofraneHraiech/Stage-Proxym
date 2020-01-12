import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInAgentComponent } from './sign-in-agent.component';

describe('SignInAgentComponent', () => {
  let component: SignInAgentComponent;
  let fixture: ComponentFixture<SignInAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
