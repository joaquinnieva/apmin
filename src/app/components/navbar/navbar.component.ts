import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import { SessionService } from 'src/utils/Session';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user:any
  public mobileMenu = false;
  public isLogged:any

  constructor(
    private sessionService: SessionService,
    public authService: AuthGuard,
    private apiService:ApiService,
    private loginService: LoginService,
  ) {
    this.getInfoUser()
  }

  ngOnInit(): void {
  }
  
  async getInfoUser(){
    const user = localStorage.getItem('session')
    if (user) {
      const json= JSON.parse(user)
      this.user = this.getDecodedAccessToken(json.token)
      const res:any = await this.apiService.getUser(this.user?.name)
    }
  }

  mobileMenuHandler(){
    this.mobileMenu = !this.mobileMenu
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}
