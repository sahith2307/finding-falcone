import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-planet-settings',
  templateUrl: './planet-settings.component.html',
  styleUrls: ['./planet-settings.component.scss'],
})
export class PlanetSettingsComponent implements OnInit {
  @Input() planets: Array<any> = [];
  @Input() vehicles: Array<any> = [];
  @Input() name: string = '';
  @Input() planetNumber: string = '';
  @Input() myControl: string = '';
  myPlanet: any = {};
  @Input() myControlVehicles: string = '';
  @Output() planetEmitter = new EventEmitter<any>();
  @Output() vehicleEmitter = new EventEmitter<any>();
  filterVehicle: Array<any> = this.vehicles
    .filter((each: any) => each.total_no === 0)
    .map((each) => each.name);
  selectPlanet = (value: any) => {
    this.myPlanet = value;
    const planet: any = {};
    planet[this.name] = {};
    planet[this.name].planetName = value.name;
    planet[this.name].planetDistance = value.distance;
    this.planetEmitter.emit(planet);
    this.myControlVehicles = '';
    this.vehicleEmitter.emit({});
  };
  selectVehicle = (value: any) => {
    if (value.total_no && this.myPlanet.distance <= value.max_distance) {
      const vehicle: any = {};
      vehicle[this.name] = {};
      vehicle[this.name].vehicleName = value.name;
      vehicle[this.name].numberOfVehicles = 1;
      vehicle[this.name].distanceTravel = value.max_distance;
      vehicle[this.name].speedPerHour = value.speed;
      this.vehicleEmitter.emit(vehicle);
    }
  };

  constructor() {}

  ngOnInit(): void {}
}
