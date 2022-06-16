import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public mobileMenu = false;

  constructor() { }

  ngOnInit(): void {
  }

  mobileMenuHandler(){
    this.mobileMenu = !this.mobileMenu
  }
}
