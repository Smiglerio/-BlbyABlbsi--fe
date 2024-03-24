import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularDemoComponent } from './formular-demo.component';

describe('FormularDemoComponent', () => {
  let component: FormularDemoComponent;
  let fixture: ComponentFixture<FormularDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
