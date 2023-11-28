import { Component } from '@angular/core';
import {DataService} from "./Services/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [DataService]
})
export class AppComponent {
  title = 'ToDo-App';

  constructor(private dataService : DataService) {
  }
}
