import {Component, EventEmitter, Output} from '@angular/core';
import {DemoService} from "../services/demo.service";
import {ToastService, AngularToastifyModule} from "angular-toastify";
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIcon} from "@angular/material/icon";
import {LoginDTO, UserDTO} from "../model/model";
import {provideRouter, Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, MatIcon, RouterLink,AngularToastifyModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  constructor(private formBuilder: FormBuilder, private demoService: DemoService, private toastService: ToastService, private router: Router,private authService: AuthService) {}

  @Output() newUserEvent = new EventEmitter<UserDTO>();



  formular = new FormGroup({
    username: new FormControl(),
    heslo: new FormControl(),
    vaha: new FormControl(),
    vyska: new FormControl(),
    pohlavie: new FormControl(),
    vek: new FormControl(),
  })
  formular1 = new FormGroup({
    username: new FormControl(),
    heslo: new FormControl(),
  })
  onSubmit() {
    //console.log(this.formular.value);
    if (this.formular.value) {
      let user = new UserDTO(null, null,
        this.formular.value.username, this.formular.value.heslo,this.formular.value.vek,this.formular.value.vaha,
        this.formular.value.vyska,this.formular.value.pohlavie);
      this.demoService.vytvorUsera(user).subscribe(id => {
        user.id = id;
        this.newUserEvent.emit(user);

        this.toastService.info('Úspešné zaregistrovaný, teraz sa môžte prihlásiť');
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['../registration']);
        });

      }, error => {
        console.error('chyba vytvarania Usera!');
        this.toastService.error("chyba vytvarania Usera!!!");
      });
    }
  }

  login(): void {
    if (this.formular1.valid) {
      const { username, heslo } = this.formular1.value;
      this.demoService.login(username, heslo).subscribe(
        response => {
          this.authService.setToken(response);
          console.log("test " + this.authService.setToken(response));
          this.demoService.getUzivatelFromToken(response).subscribe(
            user => {
              this.toastService.success("Prihlásenie úspešné");
              this.router.navigate(['../profile-page']);
            },
            error => {
              this.toastService.error("Neúspešné prihlásenie");
              console.error('Chyba pri získavaní informácií o používateľovi!', error);
            }
          );
        },
        error => {
          console.error('Prihlásenie zlyhalo', error);
        }
      );
    }
  }

  auth(): AuthService {
    return this.authService;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => console.log('odhlaseny..')
    });
  }
}
