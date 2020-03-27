import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';
import { IDay } from 'src/app/interfaces/i-day';
import { WEEK_DAYS } from '../../config/constants';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.css']
})
export class MonthViewComponent implements OnInit, OnChanges {
  @Input() monthData: Array<IDay[]>;
  @Output() onShowModal = new EventEmitter<IDay>();
  weekDays: string[] = WEEK_DAYS;

  constructor() {
  }

  ngOnInit(): void {
  }

  onShowAddModal(date: IDay) {
    this.onShowModal.emit(date);
  }
}
