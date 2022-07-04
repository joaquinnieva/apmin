import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  session() {
    const session = localStorage.getItem("session")
    return session
  }
}