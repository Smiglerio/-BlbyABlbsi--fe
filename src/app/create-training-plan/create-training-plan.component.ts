import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DemoService} from "../services/demo.service";
import {ToastService} from "angular-toastify";
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIcon} from "@angular/material/icon";
import {CvicenieDTO, LoginDTO, treningovyPlanDTO, UserDTO} from "../model/model";
import {provideRouter, Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";
@Component({
  selector: 'app-create-training-plan',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, MatIcon, RouterLink, MatTable, MatColumnDef, MatHeaderCell, MatCell, MatCellDef, MatHeaderCellDef, MatCheckbox, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow],
  templateUrl: './create-training-plan.component.html',
  styleUrl: './create-training-plan.component.css'
})
export class CreateTrainingPlanComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private demoService: DemoService, private toastService: ToastService, private router: Router,private authService: AuthService) {}
  TPformular = new FormGroup({
    nazov: new FormControl(),
    popis: new FormControl()
  })
  data: any[] = [];
  selectedExercises: any[] = [];
  filteredData: any[] = [];
  searchText: string = '';
  cvicenia: CvicenieDTO[] = [];

  displayedColumns: string[] = ['select', 'nazovCviku', 'popisCviku','narocnost'];
  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    this.demoService.getCvicenieList().subscribe(data => {
      this.data = data;
      this.filteredData = data;
    });
  }
  /*vytvorPlan():void {
    console.log(this.TPformular.value);
    let treningPlan = new treningovyPlanDTO(null,this.TPformular.value.nazov,this.TPformular.value.popis);
    this.demoService.createTreningovyPlan(treningPlan).subscribe(id =>{
      treningPlan.planid = id;
      console.log("Treningovy plán bol vytvorený s id " + id);
    })
  }*/
  vytvorPlan(): void {
    let pokus : number[] = [];
    this.selectedExercises.forEach(value => {
      pokus.push(value['cvicenieid'])
    })
    let treningPlan = new treningovyPlanDTO(null, this.TPformular.value.nazov, this.TPformular.value.popis, pokus);
    console.log(treningPlan.cviceniaList);


    this.demoService.createTreningovyPlan(treningPlan).subscribe(id => {
      treningPlan.planid = id;
      console.log('Treningovy plán bol vytvorený s id ' + id);
    });
  }

  toggleSelection(exercise: any): void {
    const index = this.selectedExercises.indexOf(exercise);
    if (index === -1) {
      this.selectedExercises.push(exercise);
    } else {
      this.selectedExercises.splice(index, 1);
    }
  }
  filterExercises() {
    this.filteredData = this.data.filter(exercise =>
      exercise.nazovCviku.toLowerCase().startsWith(this.searchText.toLowerCase())
    );
  }
}
