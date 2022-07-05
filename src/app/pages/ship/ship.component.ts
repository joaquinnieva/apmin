import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css'],
})
export class ShipComponent implements OnInit {
  public shipId: any;
  public shipInfo: any;
  public user: any;
  public isAuthor = false;
  public inEdit = false;

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.getParams();
    this.getInfoUser()
    this.getShipInfo();
  }

  onFocus(){
    this.inEdit = true
  }
  async saveShip(){
    this.inEdit = false
    const res= await this.apiService.editShipById(this.shipId, this.shipInfo.data)
    if (res) {
      this.getInfoUser()
    }
  }
  async stepDone(index:any){
    this.shipInfo.data[index].status=true
    this.inEdit = false
    const res= await this.apiService.editShipById(this.shipId, this.shipInfo.data)
    if (res) {
      this.getInfoUser()
    }
  }
  async stepToDo(index:any){
    this.shipInfo.data[index].status=false
    this.inEdit = false
    const res= await this.apiService.editShipById(this.shipId, this.shipInfo.data)
    if (res) {
      this.getInfoUser()
    }
  }

  getParams() {
    this.route.params.subscribe((params) => {
      this.shipId = params['id'];
    });
  }

  async getShipInfo() {
    const res: any = await this.apiService.getShipById(this.shipId);
    if (res) {
      this.shipInfo = res;
      this.sessionIsAuthor()
    }
  }
  sessionIsAuthor() {
    if (this.user && this.user.name == this.shipInfo.author) {
      this.isAuthor = true;
    }else{
      this.isAuthor = false;
    }
  }

  async getInfoUser() {
    const user = localStorage.getItem('session');
    if (user) {
      const json = JSON.parse(user);
      this.user = this.getDecodedAccessToken(json.token);
    }
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
