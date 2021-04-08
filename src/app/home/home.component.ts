import { Component, OnInit } from '@angular/core';

import { Person } from '../models/person';
import { Group } from '../models/group';
import { PersonService } from '../services/person.service';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  people: Person[] = [];
  selectedPerson?: Person;
  groups: Group[] = [];
  selectedGroup?: Group;

  constructor(
    private personService: PersonService,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    this.personService.getAllPeople().subscribe((people) => {
      this.people = people;
    });
    this.groupService.getAllGroups().subscribe((groups) => {
      this.groups = groups;
    });
  }
}
