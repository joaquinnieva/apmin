import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  api:string = 'https://apminapi-production.up.railway.app/api/';

  constructor(private http: HttpClient) {}

  async loginUser(body: any) {
    const res = this.http.post(this.api+"user/login", body).toPromise();
    if (res) {
      return res
    }
    return res
  }
  async getUser(id: any) {
    return this.http.get(this.api + "user/" +id).toPromise();
  }

  async registerUser(body: any) {
    return this.http.post(this.api, body).toPromise();
  }
  async addDataToUser(body: any) {
    return this.http.put(this.api, body).toPromise();
  }
  async getInfo(url: any) {
    return this.http.get(this.api + url).toPromise();
  }
  async createShip(body: any) {
    return this.http.post(this.api + 'shipping', body).toPromise();
  }
}