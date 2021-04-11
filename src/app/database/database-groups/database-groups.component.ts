import { Component, Input, OnInit } from '@angular/core';

import { GroupsService } from 'src/app/services/groups.service';

import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-database-groups',
  templateUrl: './database-groups.component.html',
  styleUrls: ['./database-groups.component.scss']
})
export class DatabaseGroupsComponent implements OnInit {

  groups: Group[] = [];
  displayedColumns: string[] = [
    "name"
  ]

  constructor(private groupsService: GroupsService) { }

  ngOnInit(): void {

    this.groupsService.getAllGroups().subscribe((groups) => {
      this.groups = groups;
    });
  }

}
