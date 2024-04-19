
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


  constructor(id: number | null, meno: string, priezvisko: string, username: string, heslo: string, vek: number, vaha: number, vyska: number, pohlavie: string) {
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
export class CvicenieDTO {
  cvicenieid: number | null;
  nazovcviku: string;
  popiscviku: string;
  narocnostcviku: string;

  constructor(cvicenieid: number | null, nazovcviku: string, popiscviku: string, narocnostcviku: string) {
    this.cvicenieid = cvicenieid;
    this.nazovcviku = nazovcviku;
    this.popiscviku = popiscviku;
    this.narocnostcviku = narocnostcviku;
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

  constructor(planid: number | null, nazov: string , popis: string) {
    this.nazov = nazov;
    this.planid = planid;
    this.popis = popis;
  }
}
