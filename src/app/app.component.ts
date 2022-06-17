import { Component } from '@angular/core';
import { isLogged } from 'src/utils/isLogged';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public session = isLogged();
}
