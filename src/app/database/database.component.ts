import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatTabGroup } from '@angular/material/tabs';

import { GroupsService } from '../services/groups.service';
import { PeopleService } from '../services/people.service';

import { Group } from '../models/group';
import { Person } from '../models/person';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {

  groups: Group[] = [];
  people: Person[] = [];

  constructor(
    private groupsService: GroupsService,
    private peopleService: PeopleService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  addEntity(tabs: MatTabGroup) {
    switch (tabs.selectedIndex) {
      case 0:
        console.log("People");
        break;
      case 1:
        console.log("Groups");
        break
    }
  }

  private loadData() {
    this.groupsService.getAllGroups().subscribe((groups) => {
      this.groups = groups;
      this.peopleService.getAllPeople().subscribe((people) => {
        this.people = people.map((person) => {
          person.groupName = groups.filter((group) => group.id === person.groupId)[0].name;
          return person;
        });
      });
    });
  }
}
