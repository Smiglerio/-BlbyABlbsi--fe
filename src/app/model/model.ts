import {ɵElement, ɵValue} from "@angular/forms";

export class UserDTO {
  id: number|null;
  meno: ɵValue<ɵElement<string[], null>>;
  priezvisko: ɵValue<ɵElement<string[], null>> | undefined;
  username: ɵValue<ɵElement<string[], null>> | undefined;
  heslo: ɵValue<ɵElement<string[], null>> | undefined;
  vek: ɵValue<ɵElement<string[], null>> | undefined;
  vaha: ɵValue<ɵElement<string[], null>> | undefined;
  vyska: ɵValue<ɵElement<string[], null>> | undefined;
  pohlavie: ɵValue<ɵElement<string[], null>> | undefined;


  constructor(id: number | null, meno: ɵValue<ɵElement<string[], null>>, priezvisko: ɵValue<ɵElement<string[], null>> | undefined, username: ɵValue<ɵElement<string[], null>> | undefined, heslo: ɵValue<ɵElement<string[], null>> | undefined, vek: ɵValue<ɵElement<string[], null>> | undefined, vaha: ɵValue<ɵElement<string[], null>> | undefined, vyska: ɵValue<ɵElement<string[], null>> | undefined, pohlavie: ɵValue<ɵElement<string[], null>> | undefined) {
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
