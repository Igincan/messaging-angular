import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from 'rxjs';

import { Person } from '../models/person';
import { PersonForm } from "../models/forms/person-form";
import { MessageResponse } from '../models/responses/message-response';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private _http: HttpClient) { }

  private _httpOption = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  getAllPeople(): Observable<Person[]> {
    return this._http.get<Person[]>("/api/allPeople", this._httpOption);
  }

  getPerson(id: number): Observable<Person> {
    return this._http.get<Person>(`/api/person/${id}`);
  }

  addPerson(person: PersonForm): Observable<Person> {
    return this._http.post<Person>("/api/addPerson", person);
  }

  editPerson(person: Person): Observable<Person> {
    return this._http.put<Person>("/api/editPerson", person);
  }

  removePerson(id: number): Observable<MessageResponse> {
    return this._http.delete<MessageResponse>(`api/removePerson/${id}`);
  }
}
