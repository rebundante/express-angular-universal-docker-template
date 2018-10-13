import { Component, Inject, PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isBrowser = false;
  isServer = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object) {

    console.log(isPlatformBrowser(this.platformId));
    console.log(isPlatformServer(this.platformId));
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isServer = isPlatformServer(this.platformId);

  }
  title = 'app ';
}
