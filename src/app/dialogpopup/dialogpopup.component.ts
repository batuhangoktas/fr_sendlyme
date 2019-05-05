import {Component, Inject, OnInit} from '@angular/core';
//import {DialogData} from '../menu/menu.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialogpopup',
  templateUrl: './dialogpopup.component.html',
  styleUrls: ['./dialogpopup.component.scss']
})
export class DialogpopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogpopupComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}







