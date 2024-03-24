import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AngularToastifyModule} from "angular-toastify";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AngularToastifyModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BlbyABlbsife';
}
