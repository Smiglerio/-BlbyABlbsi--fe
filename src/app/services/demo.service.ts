import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {CvicenieDTO, UserDTO} from "../model/model"
import {map, Observable} from "rxjs";
import {HttpClientModule} from "@angular/common/http";
/*import * as http from "http";*/

@Injectable({
  providedIn: 'root'
})


export class DemoService {
  private apiUrlUserCreate: string = "http://localhost:8080/fitness/api/uzivatel";
  private apiUrlUserLogin: string = "http://localhost:8080/fitness/api/login";
  constructor(private http: HttpClient) { }

  /*let req = http.get<CvicenieDTO>('fitness/api/cvicenie/list');*/



  vytvorUsera(user: UserDTO): Observable<number>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.post<number>(this.apiUrlUserCreate, user, {headers});
  }

  getCvicenieList(): Observable<any>{
    return this.http.get('http://localhost:8080/fitness/api/cvicenie/list');
  }
  getTreningovePlanyList() : Observable<any>{
    return this.http.get('http://localhost:8080/fitness/api/treningovyPlan/list');
  }
 /* login(username: ɵValue<ɵElement<(string | ((control: AbstractControl) => (ValidationErrors | null)))[], null>> | undefined, password: ɵValue<ɵElement<string[], null>> | undefined): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      /!*'Access-Control-Allow-Origin': '*',
      'Access-Control-Resource-Sharing' : '*'*!/
    });
    return this.http.post<any>(this.apiUrlUserLogin, { username, password }, {headers});
  }*/
  login(username: string, heslo: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.apiUrlUserLogin, { username, heslo }, { headers });
  }

  getCviceniaByPlan(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/fitness/api/treningovyPlan/cvicenia/${id}`);
  }
}
