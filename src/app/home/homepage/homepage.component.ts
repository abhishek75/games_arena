import { Component, OnInit, OnDestroy } from '@angular/core';
import {interval} from 'rxjs/internal/observable/interval';
import {startWith, switchMap} from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { RouterDataService } from '@app/core/services/router-data/router-data.service';
import { AlertService } from '@app/core';
import { DashboardModel } from '@app/dashboard-home/shared/models/dashboard.model';
import { HomeApiService } from '../shared/services/home-api/home-api.service';

@Component({
  selector: 'home-home-page',
  templateUrl: './homepage.component.html',
})
export class HomePageComponent implements OnInit, OnDestroy {
  constructor(
    private homeApiService: HomeApiService,
    private routerDataService: RouterDataService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.alertService.hide();
  }
  
  ngOnDestroy() {
  }
}
