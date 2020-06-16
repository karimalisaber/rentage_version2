import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  @Input('post') post;

  constructor() { }

  ngOnInit(): void {
  }

}
