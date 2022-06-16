import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.css']
})
export class MenuProfileComponent implements OnInit {

  public isOpenMenuProfile = false;
  constructor() { }

  ngOnInit(): void {
  }
  
  menuProfileHandler(){
    this.isOpenMenuProfile = !this.isOpenMenuProfile
  }
}
