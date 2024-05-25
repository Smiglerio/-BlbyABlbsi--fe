import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink, RouterOutlet,Router} from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {HomePageComponent} from "./home-page/home-page.component";
import {AuthService} from "./services/auth.service";
import {AngularToastifyModule,ToastService} from "angular-toastify";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatButtonModule, MatMenuModule, MatToolbar, MatIcon, HomePageComponent
    , CommonModule, AngularToastifyModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(public router: Router,private authService: AuthService,private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): boolean {
    this.isLoggedIn = this.authService.isLogged();
    return this.isLoggedIn;
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.toastService.success('odhlaseny');
        // Môžete tu pridať ďalšie kroky po úspešnom odhlásení, napríklad presmerovanie na inú stránku.
      },
      error: (error) => {
        this.toastService.error('Chyba pri odhlasovaní:');
        // Môžete tu spracovať chybu, napríklad zobraziť užívateľovi upozornenie.
      }
    });
  }

  title = 'BlbyABlbsife';
  protected readonly RouterLink = RouterLink;
}
