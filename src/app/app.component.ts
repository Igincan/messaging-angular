import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

  constructor(private _titleService: Title) { }

  ngOnInit(): void {
    this._titleService.setTitle("Samanet | Messaging");
  }
}
