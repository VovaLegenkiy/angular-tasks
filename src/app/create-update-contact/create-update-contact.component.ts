import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../contact';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-update-contact',
  templateUrl: './create-update-contact.component.html',
  styleUrls: ['./create-update-contact.component.css']
})
export class CreateUpdateContactComponent implements OnInit {
  createMode: boolean = true;
  contact: Contact = new Contact('', '', '');
  isLoading: boolean = false;
  
  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.createMode = false;
      this.isLoading = true;
      // should get user by id and store it to variable
    }
  }

  onBack(e){
    this.location.back();
  }

  onCreate(e){

  }

  onUpdate(e){}

}
