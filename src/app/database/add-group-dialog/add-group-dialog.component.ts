import { Component, OnInit } from '@angular/core';

import { GroupForm } from 'src/app/models/forms/group-form';

@Component({
  selector: 'app-add-group-dialog',
  templateUrl: './add-group-dialog.component.html',
  styleUrls: ['./add-group-dialog.component.scss']
})
export class AddGroupDialogComponent implements OnInit {

  group: GroupForm = {};

  constructor() { }

  ngOnInit(): void {
  }

}
