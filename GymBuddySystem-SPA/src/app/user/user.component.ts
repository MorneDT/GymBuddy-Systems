import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentToggle:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu() {
    if (!this.currentToggle){
      this.currentToggle = true;
    } else {
      this.currentToggle = false;
    }
  }

  logout() {

  }
}
