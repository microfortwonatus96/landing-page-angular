import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let scrollXCenter = () => {
      let overview = document.querySelector("#overview > div");
      if (window.innerWidth <= 1440) {
        overview.scrollLeft = (overview.scrollWidth - window.innerWidth) / 2;
      }
    };
    window.addEventListener("resize", scrollXCenter);
    window.addEventListener("load", scrollXCenter);
  }

}
