import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WEEK_DAYS } from '../../config/constants';
import { Moment } from 'moment';
import { IDay } from 'src/app/interfaces/i-day';

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.css']
})
export class WeekViewComponent implements OnInit {
  @Input() weekData;
  @Output() onShowModal = new EventEmitter<IDay>();
  weekDays = WEEK_DAYS;

  constructor() { }

  ngOnInit(): void {
  }

  onShowAddModal(date: IDay) {
    this.onShowModal.emit(date);
  }

}
