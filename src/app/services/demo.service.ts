import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {CvicenieDTO, treningovyPlanDTO, UserDTO, UserRolesDto} from "../model/model"
import {map, Observable, switchMap, tap} from "rxjs";
import {HttpClientModule} from "@angular/common/http";
/*import * as http from "http";*/

@Injectable({
  providedIn: 'root'
})

export class DemoService {
  private apiUrlUserCreate: string = "http://localhost:8080/fitness/api/uzivatel";
  private apiUrlUserLogin: string = "http://localhost:8080/fitness/api/login";
  private apiUrlUserChange: string = "http://localhost:8080/fitness/api/uzivatel/{id}";
  constructor(private http: HttpClient) { }

  vytvorUsera(user: UserDTO): Observable<number>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic '
    });
    return this.http.post<number>(this.apiUrlUserCreate, user, {headers});
  }

  ZmenUsera(user: UserDTO): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic '
    });
    return this.http.post<any>('http://localhost:8080/fitness/api/uzivatel/update', user, {headers});
  }

  UpdatePassword(user: UserDTO): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic '
    });
    return this.http.post<any>('http://localhost:8080/fitness/api/uzivatel/updatePassword', user, {headers});
  }

  getCvicenieList(): Observable<any>{
    return this.http.get('http://localhost:8080/fitness/api/cvicenie/list');
  }
  getTreningovePlanyList() : Observable<any>{
    return this.http.get('http://localhost:8080/fitness/api/treningovyPlan/list');
  }

  getTreningovePlanyUsera(token: String){
    return this.http.post<any>('http://localhost:8080/fitness/api/treningovyPlan/userList', token);
  }
  deleteTreningovePlanyUsera(token_PlanId: String){
    return this.http.post<any>('http://localhost:8080/fitness/api/treningovyPlan/deleteInUser', token_PlanId);
  }

  //login(username: string, heslo: string): Observable<any> {
  //  const headers = new HttpHeaders({
  //    'Content-Type': 'application/json',
  //    'Authorization': 'Bearer'
  //  });
  //  return this.http.post<any>(this.apiUrlUserLogin, { username, heslo }, { headers });
  //}
  login(username: string, heslo: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '
    });
    return this.http.post<string>(this.apiUrlUserLogin, { username, heslo }, { headers, responseType: 'text' as 'json' });
  }
  getUzivatelFromToken(token: String | null): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '
    });
    const temp  = this.http.post<string>("http://localhost:8080/fitness/api/getUzivatelFromToken",{token},{ headers, responseType: 'text' as 'json' });
    return temp;
  }

  getCviceniaByPlan(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/fitness/api/treningovyPlan/cvicenia/${id}`);
  }

  getCviceniaByPlanForUser(token_PlanId: string): Observable<any> {
    return this.http.post(`http://localhost:8080/fitness/api/treningovyPlan/cvicenia/getCviceniaByuser`, token_PlanId);
  }
  createUzivatelTreningPlan(userId: number, planId: number): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/fitness/api/uzivatel/${userId}/treningovyPlan/${planId}`, {});
  }
  createTreningovyPlan(treningovyPlanDTO: treningovyPlanDTO){
    return this.http.post<any>('http://localhost:8080/fitness/api/treningovyPlan',treningovyPlanDTO);
  }
  createCvicenie(CvicenieDTO: CvicenieDTO) {
    return this.http.post<any>('http://localhost:8080/fitness/api/cvicenie',CvicenieDTO);
  }
  getVahyByUserId(token: string): Observable<any> {
    return this.http.post<any>('http://localhost:8080/fitness/api/uzivatel/getVahy', token);
  }
  deleteCvicenie(cvicenieId: String){
    return this.http.post<any>('http://localhost:8080/fitness/api/cvicenie/delCvicenie', cvicenieId);
  }
  deletePlan(planId: String){
    return this.http.post<any>('http://localhost:8080/fitness/api/treningovyPlan/delete', planId);
  }
  getPlanByID(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/fitness/api/treningovyPlan/${id}`);
  }
  updatePokrok(data: String): Observable<any> {
    return this.http.post(`http://localhost:8080/fitness/api/uzivatel/updatePokrok`, data);
  }
}
