import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { FetchingService } from 'src/app/fetching.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private fetchingService: FetchingService) {}
  planets: Array<any> = [];
  myControl = new FormGroup({
    planet1: new FormControl(),
    planet2: new FormControl(),
    planet3: new FormControl(),
  });
  selectPlanet = (value: any) => {
    console.log(value);
  };
  ngOnInit() {
    this.fetchingService
      .getData('https://findfalcone.herokuapp.com/planets')
      .subscribe((res: any) => {
        this.planets = res;
      });
  }

  show() {
    console.log(this.myControl.value);
  }
}
