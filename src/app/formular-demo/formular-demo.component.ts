import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators, ɵElement, ɵValue} from '@angular/forms';
import {DemoService} from "../services/demo.services";
import {ToastService} from "angular-toastify";
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIcon} from "@angular/material/icon";
import {UserDTO} from "../model/model";

@Component({
  selector: 'app-formular-demo',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, MatIcon],
  templateUrl: './formular-demo.component.html',
  styleUrl: './formular-demo.component.css'
})
export class FormularDemoComponent {

  constructor(private formBuilder: FormBuilder, private demoService: DemoService, private toastService: ToastService) {}

  @Output() newUserEvent = new EventEmitter<UserDTO>();

  formular = this.formBuilder.group({
    meno: ['', Validators.required],
    priezvisko: [''],
    username: [''],
    heslo: [''],
    vek: [''],
    vaha: [''],
    vyska: [''],
    pohlavie: ['']
  });

  onSubmit() {
    console.log(this.formular.value);
    if (this.formular.value.meno != null && this.formular.value.priezvisko != null) {
      let user: UserDTO = new UserDTO(null, this.formular.value.meno, this.formular.value.priezvisko, this.formular.value.username, this.formular.value.heslo, this.formular.value.vek, this.formular.value.vaha, this.formular.value.vyska, this.formular.value.pohlavie);
      this.demoService.vytvorUsera(user).subscribe(id => {
        console.log('User bol uspesne vytvoreny')
        user.id = id;
        this.newUserEvent.emit(user);
      }, error => {
        console.error('chyba vytvarania Usera!')
        this.toastService.error("chyba vytvarania Usera!!!");
      });
    }
  }

}
