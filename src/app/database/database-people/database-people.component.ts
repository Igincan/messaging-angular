import { Component, Input, OnInit } from '@angular/core';

import { PeopleService } from 'src/app/services/people.service';
import { GroupsService } from 'src/app/services/groups.service';

import { Person } from 'src/app/models/person';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-database-people',
  templateUrl: './database-people.component.html',
  styleUrls: ['./database-people.component.scss']
})
export class DatabasePeopleComponent implements OnInit {

  @Input() people: Person[] = [];
  @Input() groups: Group[] = [];
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
