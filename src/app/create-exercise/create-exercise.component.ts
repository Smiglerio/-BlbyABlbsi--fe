import { Component } from '@angular/core';
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

@Component({
  selector: 'app-create-exercise',
  standalone: true,
    imports: [
      ReactiveFormsModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, MatIcon, RouterLink
    ],
  templateUrl: './create-exercise.component.html',
  styleUrl: './create-exercise.component.css'
})
export class CreateExerciseComponent {
  constructor(private formBuilder: FormBuilder, private demoService: DemoService, private toastService: ToastService, private router: Router,private authService: AuthService) {}
  Cviky = new FormGroup({
    nazovCviku: new FormControl(),
    popisCviku: new FormControl(),
    idTypCvicenia: new FormControl()
  })

  vytvorCvicenie():void {
    console.log(this.Cviky.value);
    let cvicenie = new CvicenieDTO(null,this.Cviky.value.nazovCviku,this.Cviky.value.popisCviku,this.Cviky.value.idTypCvicenia);
    this.demoService.createCvicenie(cvicenie).subscribe(id => {
      cvicenie.idTypCvicenia = id;
      console.log("Cvicenie bolo vytvorene s id " + id);
      console.log("pokus dnu " + cvicenie.nazovCviku + " " +  cvicenie.popisCviku);
    })
  }
}
