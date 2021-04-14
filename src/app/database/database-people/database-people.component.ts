import { Component, Input, OnInit } from '@angular/core';

import { Person } from 'src/app/models/person';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-database-people',
  templateUrl: './database-people.component.html',
  styleUrls: ['./database-people.component.scss']
})
export class DatabasePeopleComponent implements OnInit {

  private _people: Person[] = [];
  @Input() set people(value: Person[]) {
    this._people = value;
  }
  get people(): Person[] {
    return this._people;
  }
  private _groups: Group[] = [];
  @Input() set groups(value: Group[]) {
    this._groups = value;
  }
  get groups(): Group[] {
    return this._groups;
  }
  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "phoneNumber",
    "group"
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
