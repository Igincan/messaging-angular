import { Component, Input, OnInit } from '@angular/core';

import { Group } from 'src/app/models/group';
import { PersonForm } from 'src/app/models/forms/person-form';

@Component({
  selector: 'app-add-person-dialog',
  templateUrl: './add-person-dialog.component.html',
  styleUrls: ['./add-person-dialog.component.scss']
})
export class AddPersonDialogComponent implements OnInit {

  groups: Group[] = [];
  person: PersonForm = {};

  constructor() { }

  ngOnInit(): void {
  }

}
