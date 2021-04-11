import { Component, Input, OnInit } from '@angular/core';

import { PeopleService } from 'src/app/services/people.service';

import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-database-people',
  templateUrl: './database-people.component.html',
  styleUrls: ['./database-people.component.scss']
})
export class DatabasePeopleComponent implements OnInit {

  people: Person[] = [];
  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "phoneNumber"
  ]

  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {

    this.peopleService.getAllPeople().subscribe((people) => {
      this.people = people;
    });
  }

}
