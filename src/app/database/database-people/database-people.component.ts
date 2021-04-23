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
  specialColumns = {
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
      this.displayedColumns.push(this.specialColumns.deleteButton);
    } else {
      this.displayedColumns = this.displayedColumns
        .filter((column) => column !== this.specialColumns.deleteButton);
    }
  }
  get deleteIsShowed() {
    return this._deleteIsShowed;
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

  showDeleteDialog(person: Person) {
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
}
