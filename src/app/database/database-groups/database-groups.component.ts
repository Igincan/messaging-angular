import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-database-groups',
  templateUrl: './database-groups.component.html',
  styleUrls: ['./database-groups.component.scss']
})
export class DatabaseGroupsComponent implements OnInit, AfterViewInit {

  private _groups: Group[] = [];
  @Input() set groups(value: Group[]) {
    this._groups = value;
    this.dataSource.data = this._groups;
  }
  get groups(): Group[] {
    return this._groups;
  }
  displayedColumns: string[] = [
    "name"
  ];
  filterInput: string = "";
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Group> = new MatTableDataSource(this._groups);
  @Input() filterIsShowed!: boolean;

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
