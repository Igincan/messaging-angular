import { Component, Input, OnInit } from '@angular/core';

import { PersonService } from 'src/app/services/person.service';

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

  constructor(private personService: PersonService) { }

  ngOnInit(): void {

    this.personService.getAllPeople().subscribe((people) => {
      this.people = people;
    });
  }

}
