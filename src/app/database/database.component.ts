import { Component, OnInit } from '@angular/core';

import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarHorizontalPosition } from "@angular/material/snack-bar";

import { Group } from '../models/group';
import { Person } from '../models/person';
import { PersonForm } from '../models/forms/person-form';
import { GroupsService } from '../services/groups.service';
import { PeopleService } from '../services/people.service';
import { AddPersonDialogComponent } from './add-person-dialog/add-person-dialog.component';
import { AddGroupDialogComponent } from './add-group-dialog/add-group-dialog.component';

enum TabType { PEOPLE, GROUPS }

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {

  groups: Group[] = [];
  people: Person[] = [];
  selectedTab: TabType = TabType.PEOPLE;

  constructor(
    private groupsService: GroupsService,
    private peopleService: PeopleService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  onSelectedTabChanged(event: MatTabChangeEvent) {
    switch (event.index) {
      case 0:
        this.selectedTab = TabType.PEOPLE;
        break;
      case 1:
        this.selectedTab = TabType.GROUPS;
        break;
    }
  }

  showAddDialog() {
    switch (this.selectedTab) {
      case TabType.PEOPLE:
        this.showAddPersonDialog();
        break;
      case TabType.GROUPS:
        this.showAddGroupDialog();
        break;
    }
  }

  showAddPersonDialog() {
    let dialogRef = this.dialog.open(AddPersonDialogComponent);
    let component = dialogRef.componentInstance;

    component.groups = this.groups;
    dialogRef.afterClosed().subscribe((person?: PersonForm) => {
      if (person) {
        this.peopleService.addPerson(person).subscribe((newPerson: Person) => {
          this.people = this.people.slice(); // cloning because change occurred (===)
          this.people.push(newPerson);
          this._snackBar.open("Person added!", undefined, {
            duration: 4000,
            horizontalPosition: 'start'
          });
        });
      }
    });
  }

  showAddGroupDialog() {
    this.dialog.open(AddGroupDialogComponent).afterClosed().subscribe((group?: Group) => {
      if (group) {
        this.groupsService.addGroup(group).subscribe((newGroup: Group) => {
          this.groups = this.groups.slice(); // cloning because change occurred (===)
          this.groups.push(newGroup);
          this._snackBar.open("Group added!", undefined, {
            duration: 4000,
            horizontalPosition: 'start'
          });
        });
      }
    });
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
