import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

import { Person } from 'src/app/models/person';
import { Group } from 'src/app/models/group';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from "@angular/material/table";

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
  filterInput: string = "";
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Person> = new MatTableDataSource(this._people);

  constructor() { }

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
}
