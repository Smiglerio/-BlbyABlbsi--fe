import {ɵElement, ɵValue} from "@angular/forms";

export class UserDTO {
  id: number|null;
  meno: string;
  priezvisko: string;
  username: string;
  heslo: string;
  vek: number;
  vaha: number;
  vyska: number;
  pohlavie: string;


  constructor(id: number | null, meno: string, priezvisko: string, username:string, heslo: string, vek: number, vaha: number, vyska: number, pohlavie: string) {
    this.id = id;
    this.meno = meno;
    this.priezvisko = priezvisko;
    this.username = username;
    this.heslo = heslo;
    this.vek = vek;
    this.vaha = vaha;
    this.vyska = vyska;
    this.pohlavie = pohlavie;
  }
}

export class LoginDTO {
  username: string;
  heslo: string;

  constructor(username: string, heslo: string) {
    this.username = username;
    this.heslo = heslo;
  }
}
