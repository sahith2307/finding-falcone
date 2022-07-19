import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  constructor(private router: Router) {
    const result = window.history.state.result;
    if (!result) {
      this.router.navigate(['/']);
    }
  }
  results: any | undefined = {};
  startAgain() {
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
    const result = window.history.state.result;

    this.results = result;

  }
}
