import { Component, OnInit } from '@angular/core';

import { Person } from '../models/person';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  people: Person[] = [];
  selectedPerson?: Person;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.personService.getAllPeople().subscribe((people) => {
      this.people = people;
      this.selectedPerson = this.people[0];
    });
  }

}
