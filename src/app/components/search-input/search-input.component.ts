import { Component, OnInit } from '@angular/core';
import { debounceTime, map, filter, distinctUntilChanged } from 'rxjs/operators';
import { PhoneBookService } from '../../services/phone-book.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {
  text: string;
  placeholder: string = 'Please enter name, phone or email...';
  subject = new Subject();

  constructor(private pbService: PhoneBookService) { }

  ngOnInit(): void {
    this.subject.pipe(
      debounceTime(1500),
      distinctUntilChanged())
      .subscribe(searchText => this.pbService.search(searchText)
        .subscribe((data) => console.log(data)));
  }

  onChange(value) {
    this.text = value;

    this.subject.next(value);
  }

}
