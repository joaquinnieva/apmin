import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.css']
})
export class MenuProfileComponent implements OnInit {
  @Input() name = ''
  public isOpenMenuApi = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  menuApiHandler(){
    this.isOpenMenuApi = !this.isOpenMenuApi
  }
  logout(){
    localStorage.removeItem('session')
    this.router.navigate(['login'])
  }
}
