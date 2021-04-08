import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from 'rxjs';

import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  private httpOption = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>("/api/allGroups", this.httpOption);
  }
}
