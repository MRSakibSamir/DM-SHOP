import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'super-shop';
  hideLayout = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // Listen for route changes and update layout visibility
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child?.firstChild) {
            child = child.firstChild;
          }
          return child?.snapshot.data?.['hideLayout'] ?? false;
        })
      )
      .subscribe((hide: boolean) => {
        this.hideLayout = hide;
      });
  }
}
