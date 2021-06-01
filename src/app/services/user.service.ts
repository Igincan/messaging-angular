import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, of } from "rxjs";

import { MessageResponse } from "../models/responses/message-response";
import { CredentialsForm } from "../models/forms/credentials-form";
import { User } from "../models/user";


@Injectable({
  providedIn: "root"
})
export class UserService {

  isLogged = false;
  username?: string;

  constructor(private _http: HttpClient) {
    this.check();
  }

  async login(credentials: CredentialsForm): Promise<boolean> {
    await this._http.post<MessageResponse>("/api/login", credentials).toPromise();
    this.isLogged = true;
    this.username = credentials.username;
    return Promise.resolve(true);
  }

  async check(): Promise<boolean> {
    this.isLogged = await this._http.get<boolean>("api/isLogged").toPromise();
    this.username = (await this._http.get<User>("/api/logged").toPromise()).username;
    return Promise.resolve(true);
  }

  async logout(): Promise<boolean> {
    await this._http.get<MessageResponse>("/api/logout").toPromise();
    this.isLogged = false;
    this.username = undefined;
    return Promise.resolve(true);
  }
}
