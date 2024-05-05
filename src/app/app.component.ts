import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink, RouterOutlet,Router} from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {HomePageComponent} from "./home-page/home-page.component";
import {AuthService} from "./services/auth.service";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatButtonModule, MatMenuModule, MatToolbar, MatIcon,HomePageComponent
  ,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  constructor(public router: Router,private authService: AuthService) {

  }
  /*logout(): void {
    this.authService.logout().subscribe({
      next: () => console.log('odhlaseny..')
    });
  }*/
  logout(): void {
    console.log("tutu")
    this.authService.logout().subscribe({
      next: () => {
        console.log('odhlaseny..');
        // Môžete tu pridať ďalšie kroky po úspešnom odhlásení, napríklad presmerovanie na inú stránku.
      },
      error: (error) => {
        console.error('Chyba pri odhlasovaní:', error);
        // Môžete tu spracovať chybu, napríklad zobraziť užívateľovi upozornenie.
      }
    });
  }

  title = 'BlbyABlbsife';
  protected readonly RouterLink = RouterLink;
}
