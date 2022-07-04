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
  public createSend = false
  public createSendTitle = ''
  public createSendArray = [ { description: '' } ]

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getInfoUser()
    console.log(this.user)
  }

  newSend(){
    this.createSend = !this.createSend

  }
  addStep(){
    this.createSendArray.push({
        description: ''
      })

  }
  async createShip(){
    const body = {
      author: this.user.name,
      title: this.createSendTitle,
      data: this.createSendArray
    }
    const res = await this.apiService.createShip(body)
    console.log(res)
  }
  async getInfoUser(){
    const user = localStorage.getItem('session')
    if (user) {
      const json= JSON.parse(user)
      this.user = this.getDecodedAccessToken(json.token)
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
