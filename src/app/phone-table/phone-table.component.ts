import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntityItem } from '../entity-item';

@Component({
  selector: 'app-phone-table',
  templateUrl: './phone-table.component.html',
  styleUrls: ['./phone-table.component.css']
})
export class PhoneTableComponent implements OnInit {
  @Input() contacts: EntityItem[];
  @Output() onDelete = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {

  }

  handleDelete(id) {
    this.onDelete.emit(id);
  }
}
