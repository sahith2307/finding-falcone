import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-planet-settings',
  templateUrl: './planet-settings.component.html',
  styleUrls: ['./planet-settings.component.scss'],
})
export class PlanetSettingsComponent implements OnInit {
  @Input() planets: Array<any> = [];
  @Input() name: string = '';
  @Input() myControl: any;
  @Output() newItemEvent = new EventEmitter<any>();
  selectPlanet = (value: any) => {
    this.newItemEvent.emit(value);
  };

  constructor() {}

  ngOnInit(): void {}
}
