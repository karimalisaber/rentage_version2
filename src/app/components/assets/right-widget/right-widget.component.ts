import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-right-widget',
  templateUrl: './right-widget.component.html',
  styleUrls: ['./right-widget.component.scss']
})
export class RightWidgetComponent implements OnInit {
 @Input('title') title: string;
  constructor() { }

  ngOnInit(): void {
  }

}
