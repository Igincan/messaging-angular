import { Component, OnInit } from "@angular/core";

import { CredentialsForm } from "../models/forms/credentials-form";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

  credentialsForm: CredentialsForm = {};

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
  }

  login(): void {
    this._userService.login(this.credentialsForm);
  }

}
