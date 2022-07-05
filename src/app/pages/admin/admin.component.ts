import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public user:any
  public ships:any
  public createSend = false
  public createSendTitle = ''
  public createSendArray = [ { description: '' } ]

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getInfoUser()
    this.getShips()
  }

  newSend(){
    this.createSend = !this.createSend
  }
  addStep(){
    this.createSendArray.push({
        description: ''
      })
  }
  sustractStep(){
    this.createSendArray.pop()
  }
  async createShip(){
    const body = {
      author: this.user.name,
      title: this.createSendTitle,
      data: this.createSendArray
    }
    if ((this.createSendTitle.length  > 1 && this.createSendArray.length  > 1) ) {
      const res = await this.apiService.createShip(body)
      if (res) {
        this.newSend()
        this.getShips()
      }
    }
    
  }
  async getInfoUser(){
    const user = localStorage.getItem('session')
    if (user) {
      const json= JSON.parse(user)
      this.user = this.getDecodedAccessToken(json.token)
    }
  }
  async getShips(){
    if (this.user) {
      this.ships = await this.apiService.getShipsAuthor(this.user.name)
      console.log(this.ships)
    }
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}
