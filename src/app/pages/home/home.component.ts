import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchingService } from 'src/app/fetching.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private fetchingService: FetchingService,
    private router: Router
  ) {}
  totalPlanets: Array<any> = [];
  totalVehicles: Array<any> = [];
  planets: Array<any> = [];
  vehicles: Array<any> = [];
  destination: any = {};
  token: string = '';
  inputError: boolean = false;
  timeTaken: number = 0;
  buttonDisable: boolean = true;
  //Reusable functions

  buttonDisableChick = () => {
    const planets = Object.keys(this.destination)
      .map((each: any) => this.destination[each].planetName)
      .filter((each: any) => each !== undefined);

    const vehicles = Object.keys(this.destination)
      .map((each: any) => this.destination[each].vehicleName)
      .filter((each: any) => each !== undefined);
    this.buttonDisable = !(planets.length === 4 && vehicles.length === 4);
    console.log(this.buttonDisable);
  };
  distanceCalculation = () => {
    const designationKeys = Object.keys(this.destination);
    const values = designationKeys
      .map(
        (each) =>
          this.destination[each].planetDistance /
          this.destination[each].speedPerHour
      )
      .filter((each) => each);

    this.timeTaken = values.reduce((dist1, dist2) => dist1 + dist2, 0);
    console.log(values);
  };
  removeSelectedPlanet = () => {
    const total: any = Object.keys(this.destination);
    this.planets = this.totalPlanets;
    total.forEach((planet: any) => {
      if (this.destination[planet].planetName) {
        this.planets = this.planets.filter(
          (each: any) => each.name !== this.destination[planet].planetName
        );
      }
    });
  };
  removeSelectedVehicle = () => {
    const total: any = Object.keys(this.destination);
    this.vehicles = [...this.totalVehicles.filter((each) => ({ ...each }))];
    total.forEach((planet: any) => {
      if (this.destination[planet].vehicleName) {
        this.vehicles = this.vehicles.filter((each: any) => {
          if (each.name === this.destination[planet].vehicleName) {
            each.total_no = Number(each.total_no) - 1;
            const eachOne = { ...each };
            return eachOne;
          } else {
            return { ...each };
          }
        });
      }
    });
  };

  //event Functions

  submitDestination = async (event: any) => {
    event.preventDefault();

    const planets = Object.keys(this.destination)
      .map((each: any) => this.destination[each].planetName)
      .filter((each: any) => each !== undefined);

    const vehicles = Object.keys(this.destination)
      .map((each: any) => this.destination[each].vehicleName)
      .filter((each: any) => each !== undefined);

    if (planets.length === 4 && vehicles.length === 4) {
      this.fetchingService
        .postMethod('https://findfalcone.herokuapp.com/find', {
          token: this.token,
          planet_names: planets,
          vehicle_names: vehicles,
        })
        .subscribe((res: any) => {
          this.inputError = false;
          console.log(res);
          this.router.navigate(['/result'], {
            state: { result: { ...res, timeTaken: this.timeTaken } },
          });
        });
    } else {
      this.inputError = true;
    }
  };

  selectPlanet = (value: any) => {
    this.destination = { ...this.destination, ...value };
    this.removeSelectedPlanet();
    this.buttonDisableChick();
  };

  selectVehicle = (value: any) => {
    const planetNumber = Object.keys(value)[0];
    this.destination[planetNumber] = {
      ...this.destination[planetNumber],
      ...value[planetNumber],
    };
    setTimeout(() => {
      this.removeSelectedVehicle();
      this.fetchingService
        .getData('https://findfalcone.herokuapp.com/vehicles')
        .subscribe((res: any) => {
          this.totalVehicles = res;
        });
      this.distanceCalculation();
      this.buttonDisableChick();
    }, 100);
  };

  ngOnInit() {
    //fetching Planets and Vehicles

    this.fetchingService
      .getData('https://findfalcone.herokuapp.com/planets')
      .subscribe((res: any) => {
        this.planets = res;
        this.totalPlanets = res;
      });

    this.fetchingService
      .getData('https://findfalcone.herokuapp.com/vehicles')
      .subscribe((res: any) => {
        this.vehicles = res;
        this.totalVehicles = res;
      });

    // get Token by post method

    this.fetchingService
      .postMethod('https://findfalcone.herokuapp.com/token', {})
      .subscribe(async (res: any) => {
        this.token = await res.token;
      });
  }
}
