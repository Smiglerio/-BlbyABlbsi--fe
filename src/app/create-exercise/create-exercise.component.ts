import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DemoService} from "../services/demo.service";
import {ToastService} from "angular-toastify";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {CvicenieDTO} from "../model/model";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-create-exercise',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, MatIcon, RouterLink, MatCell, MatCellDef, MatCheckbox, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatHeaderCellDef
  ],
  templateUrl: './create-exercise.component.html',
  styleUrl: './create-exercise.component.css'
})
export class CreateExerciseComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private demoService: DemoService, private toastService: ToastService, private router: Router,private authService: AuthService) {}
  Cviky = new FormGroup({
    nazovCviku: new FormControl(),
    popisCviku: new FormControl(),
    idTypCvicenia: new FormControl()
  })
  data: any[] = [];
  filteredData: any[] = [];
  searchText: string = '';
  selectedDifficulty: string = '';
  displayedColumns: string[] = ['nazovCviku', 'popisCviku','narocnost', 'odstranit'];


  ngOnInit() {
    this.loadData();
    this.setupFilterListener();
  }
  vytvorCvicenie():void {
    let cvicenie = new CvicenieDTO(null,this.Cviky.value.nazovCviku,this.Cviky.value.popisCviku,this.Cviky.value.idTypCvicenia);
    this.demoService.createCvicenie(cvicenie).subscribe(id => {
      this.toastService.success('cvičenie bolo úspešne vytvorené');
      cvicenie.idTypCvicenia = id;
      this.loadData();
    })
  }
  loadData(): void {
    this.demoService.getCvicenieList().subscribe(data => {
      this.data = data;
      this.filteredData = data;
    });
  }
  filterExercises() {
    this.filteredData = this.data.filter(exercise =>
      exercise.nazovCviku.toLowerCase().startsWith(this.searchText.toLowerCase())
    );
  }
  filterExercisesByNarocnost() {
    this.filteredData = this.data.filter(exercise =>
      this.selectedDifficulty === '' || exercise.narocnost === this.selectedDifficulty
    );
  }

  deleteCvicenie(cvicenieId: string) {
    this.demoService.deleteCvicenie(cvicenieId).subscribe(response => {
      this.toastService.success('Cvicenie bolo odstránené');
      this.loadData();
    });
  }


  setupFilterListener() {
    const selectElement = document.getElementById('filtnarocnost') as HTMLSelectElement;
    selectElement.addEventListener('change', (event) => {
      this.selectedDifficulty = (event.target as HTMLSelectElement).value;
      this.filterExercisesByNarocnost();
    });
  }
}
