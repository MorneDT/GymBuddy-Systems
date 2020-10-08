import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'GymBuddySystem-SPA';
  isUserPage = false;
  routerEventSubscription: Subscription;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.routerEventSubscription = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url.toLocaleLowerCase().indexOf('user')) {
          this.isUserPage = true;
        }
        else {
          this.isUserPage = false;
        }
      }
    });
  }
  
  ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe();
    this.routerEventSubscription = null;
  }
}
