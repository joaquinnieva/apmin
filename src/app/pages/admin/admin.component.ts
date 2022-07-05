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
  public errorMessage:any = null

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

    let fieldEmpty:any = this.createSendArray.filter((field) => field.description == '')
    if (fieldEmpty.length == 0) {
      fieldEmpty = null
    }

    if (this.createSendTitle.length  > 1 && this.createSendArray.length  > 1 && !fieldEmpty) {
      this.errorMessage = ''
      const res = await this.apiService.createShip(body)
      if (res) {
        this.newSend()
        this.getShips()
        this.resetForm()
      }
    } else {
      if (this.createSendTitle.length == 0) {
        this.errorMessage = 'Debe haber titulo'
      } else if (fieldEmpty) {
        console.log(fieldEmpty)
        this.errorMessage = 'Debe llenar los campos'
      } else if (this.createSendArray.length == 1) {
        this.errorMessage = 'Debe haber 2 pasos como mínimo'
      }
    }
  }
  resetForm(){
    this.createSendTitle = ''
    this.createSendArray =  [ { description: '' } ]
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
