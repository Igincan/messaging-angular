import { Component, Input, OnInit } from '@angular/core';

import { GroupsService } from 'src/app/services/groups.service';

import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-database-groups',
  templateUrl: './database-groups.component.html',
  styleUrls: ['./database-groups.component.scss']
})
export class DatabaseGroupsComponent implements OnInit {

  @Input() groups: Group[] = [];
  displayedColumns: string[] = [
    "name"
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
