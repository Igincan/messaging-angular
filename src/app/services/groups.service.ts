import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from 'rxjs';

import { Group } from '../models/group';
import { MessageResponse } from '../models/responses/message-response';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) { }

  private httpOption = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>("/api/allGroups", this.httpOption);
  }

  getGroup(id: number): Observable<Group> {
    return this.http.get<Group>(`/api/group/${id}`);
  }

  editGroup(group: Group): Observable<Group> {
    return this.http.put<Group>("/api/editGroup", group);
  }

  removeGroup(id: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`api/removeGroup/${id}`);
  }
}
