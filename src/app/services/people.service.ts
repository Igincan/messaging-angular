import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from 'rxjs';

import { Person } from '../models/person';
import { MessageResponse } from '../models/responses/message-response';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }

  private httpOption = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  getAllPeople(): Observable<Person[]> {
    return this.http.get<Person[]>("/api/allPeople", this.httpOption);
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`/api/person/${id}`);
  }

  editPerson(person: Person): Observable<Person> {
    return this.http.put<Person>("/api/editPerson", person);
  }

  removePerson(id: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`api/removePerson/${id}`);
  }
}
