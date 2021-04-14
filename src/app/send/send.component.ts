import { Component, OnInit } from '@angular/core';

import { Group } from '../models/group';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {

  groups: Group[] = [];
  selectedGroupId?: number;

  constructor(private groupsService: GroupsService) { }

  ngOnInit(): void {
    this.groupsService.getAllGroups().subscribe((groups) => {
      this.groups = groups;
    });
  }

}
