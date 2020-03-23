import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {
  @Input() text: string;
  @Input() placeholder: string;
  @Output() onSearch = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event) {
    this.text = event.target.value;
    this.onSearch.emit(this.text);
  }

}
