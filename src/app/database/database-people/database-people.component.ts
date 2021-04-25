import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

import { Person } from 'src/app/models/person';
import { Group } from 'src/app/models/group';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PeopleService } from 'src/app/services/people.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { PersonDialogComponent } from '../person-dialog/person-dialog.component';
import { FormType } from 'src/app/models/enums/form-type';
import { PersonDialogInject } from 'src/app/models/dialog-injects/person-dialog-inject';

@Component({
  selector: 'app-database-people',
  templateUrl: './database-people.component.html',
  styleUrls: ['./database-people.component.scss']
})
export class DatabasePeopleComponent implements OnInit, AfterViewInit {

  private _people: Person[] = [];
  @Input() set people(value: Person[]) {
    this._people = value;
    this.dataSource.data = this._people;
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
  ];
  private readonly _specialColumns = {
    editButton: "editButton",
    deleteButton: "deleteButton"
  };
  filterInput: string = "";
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Person> = new MatTableDataSource(this._people);
  @Input() filterIsShowed!: boolean;
  _deleteIsShowed: boolean = false;
  @Input() set deleteIsShowed(value: boolean) {
    this._deleteIsShowed = value;
    if (this._deleteIsShowed) {
      this.displayedColumns.push(this._specialColumns.deleteButton);
    } else {
      this.displayedColumns = this.displayedColumns
        .filter((column) => column !== this._specialColumns.deleteButton);
    }
  }
  get deleteIsShowed() {
    return this._deleteIsShowed;
  }
  _editIsShowed: boolean = false;
  @Input() set editIsShowed(value: boolean) {
    this._editIsShowed = value;
    if (this._editIsShowed) {
      if (this.displayedColumns.length === 5) {
        this.displayedColumns.splice(4, 0, this._specialColumns.editButton);
      } else {
        this.displayedColumns.push(this._specialColumns.editButton);
      }
    } else {
      this.displayedColumns = this.displayedColumns
        .filter((column) => column !== this._specialColumns.editButton);
    }
  }
  get editIsShowed() {
    return this._editIsShowed;
  }

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _peopleService: PeopleService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(): void {
    this.dataSource.filter = this.filterInput.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showDeleteDialog(person: Person): void {
    let dialog = this._dialog.open(ConfirmDialogComponent, {
      data: `Are you sure you want to delete person ${person.firstName} ${person.lastName}?`
    });
    dialog.afterClosed().subscribe((confirmed?: boolean) => {
      if (confirmed) {
        this._peopleService.deletePerson(person.id).subscribe(() => {
          this._snackBar.open("Person deleted!", undefined, {
            duration: 4000,
            horizontalPosition: "start"
          });
          this.people = this.people.filter((filterPerson) => filterPerson.id !== person.id);
        })
      }
    });
  }

  showEditPersonDialog(person: Person): void {
    let dialog = this._dialog.open(PersonDialogComponent, {
      data: {
        person: { ...person },
        groups: this.groups,
        type: FormType.EDIT
      } as PersonDialogInject
    });
    dialog.afterClosed().subscribe((person?: Person) => {
      if (person) {
        this._peopleService.editPerson(person).subscribe((newPerson: Person) => {
          let index = this.people.findIndex((findPerson) => findPerson.id === newPerson.id);
          this.people[index] = newPerson;
          this.people[index].groupName = this.groups.find((group) => {
            return group.id === this.people[index].groupId
          })?.name;
          this._snackBar.open("Person edited!", undefined, {
            duration: 4000,
            horizontalPosition: "start"
          });
          this.people = this.people.slice();
        });
      }
    });
  }
}
