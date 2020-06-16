import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {

  admin: boolean =false;
  viewPassword:boolean = false; //for the small icon show password

  constructor() { }

  ngOnInit(): void {
  }

}
