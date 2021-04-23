import { Component, Inject, OnInit } from '@angular/core';

import { Group } from 'src/app/models/group';
import { PersonForm } from 'src/app/models/forms/person-form';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-person-dialog',
  templateUrl: './add-person-dialog.component.html',
  styleUrls: ['./add-person-dialog.component.scss']
})
export class AddPersonDialogComponent implements OnInit {

  person: PersonForm = {};

  constructor(@Inject(MAT_DIALOG_DATA) public groups: Group[]) { }

  ngOnInit(): void {
  }

}
