import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { SessionService } from 'src/utils/Session';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:SessionService){}
  canActivate(){
      if (this.auth.session()) {
        return true;
      }else{
        return false
      }
  }

}
