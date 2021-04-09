import { Component, Input, OnInit } from '@angular/core';

import { GroupService } from 'src/app/services/group.service';

import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-database-groups',
  templateUrl: './database-groups.component.html',
  styleUrls: ['./database-groups.component.scss']
})
export class DatabaseGroupsComponent implements OnInit {

  groups: Group[] = [];
  selectedGroup?: Group;

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {

    this.groupService.getAllGroups().subscribe((groups) => {
      this.groups = groups;
    });
  }

}
