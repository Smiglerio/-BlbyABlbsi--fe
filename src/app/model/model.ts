import {Observable} from "rxjs";

export class UserDTO {
  id: number | null;

  username: string;
  heslo: string;
  vek: number;
  vaha: string;
  vyska: number;
  pohlavie: string;


  constructor(id: number | null, username: string, heslo: string, vek: number, vaha: string, vyska: number, pohlavie: string) {
    this.id = id;
    this.username = username;
    this.heslo = heslo;
    this.vek = vek;
    this.vaha = vaha;
    this.vyska = vyska;
    this.pohlavie = pohlavie;
  }
}
export class CvicenieDTO {
  cvicenieid: number | null;
  nazovCviku: string;
  popisCviku: string;
  idTypCvicenia: number | null;
  constructor(cvicenieid: number | null, nazovcviku: string, popiscviku: string,idTypCvicenia: number | null) {
    this.cvicenieid = cvicenieid;
    this.nazovCviku = nazovcviku;
    this.popisCviku = popiscviku;
    this.idTypCvicenia = idTypCvicenia;
  }
}
export class typCviceniaDTO {
  idTypCvicenia: number | null;
  narocnost : string;
  pocetOpakovani : number;

  constructor( idTypCvicenia: number | null,narocnost : string,pocetOpakovani : number) {
    this.idTypCvicenia = idTypCvicenia;
    this.narocnost = narocnost;
    this.pocetOpakovani = pocetOpakovani;
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

export class PokrokDTO {
  planid: number | null;
  nazov: string;
  popis: string;

  constructor(planid: number | null, nazov: string, popis: string) {
    this.planid = planid;
    this.nazov = nazov;
    this.popis = popis;
  }
}

export class treningovyPlanDTO {
  planid: number |null;
  nazov : string;
  popis : string;
  public cviceniaList: number[]

  constructor(planid: number | null, nazov: string , popis: string, cviceniaList: number[]) {
    this.nazov = nazov;
    this.planid = planid;
    this.popis = popis;
    this.cviceniaList = cviceniaList;
  }
}

export interface UserRolesDto {
  username: string;
  roles: string[];
}
