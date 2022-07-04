import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public name = ''
  public password = ''
  session:any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private loginService: LoginService,
  ) {}
  ngOnInit(): void {
  }
  async login(){
    const body = { name: this.name, password: this.password };
    this.session = await this.apiService.loginUser(body)
    if (this.session) {
      this.loginService.loginin.emit(this.session)
      this.saveSession()
    }
  }
  saveSession(){
    if (this.session) {
      localStorage.setItem('session',JSON.stringify(this.session))
      // this.router.navigate(['home'])
      window.location.replace('admin');
    }
  }

}
