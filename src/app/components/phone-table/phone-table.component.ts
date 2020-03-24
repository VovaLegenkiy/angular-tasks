import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEntityItem } from '../../interfaces/i-entity-item';

@Component({
  selector: 'app-phone-table',
  templateUrl: './phone-table.component.html',
  styleUrls: ['./phone-table.component.css']
})
export class PhoneTableComponent implements OnInit {
  @Input() contacts: IEntityItem[];
  @Output() onDelete = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {

  }

  handleDelete(contact) {
    this.onDelete.emit(contact);
  }
}
