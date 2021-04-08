import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from 'rxjs';

import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private httpOption = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  getAllPeople(): Observable<Person[]> {
    return this.http.get<Person[]>("/api/allPeople", this.httpOption);
  }

  constructor(private http: HttpClient) { }
}
