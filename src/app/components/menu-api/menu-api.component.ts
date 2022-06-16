import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-api',
  templateUrl: './menu-api.component.html',
  styleUrls: ['./menu-api.component.css']
})
export class MenuApiComponent implements OnInit {
  public isOpenMenuApi = false;
  constructor() { }

  ngOnInit(): void {
  }
  
  menuApiHandler(){
    this.isOpenMenuApi = !this.isOpenMenuApi
  }
}
