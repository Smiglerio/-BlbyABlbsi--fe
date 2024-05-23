import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrainingPlanComponent } from './create-training-plan.component';

describe('CreateTrainingPlanComponent', () => {
  let component: CreateTrainingPlanComponent;
  let fixture: ComponentFixture<CreateTrainingPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTrainingPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTrainingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
