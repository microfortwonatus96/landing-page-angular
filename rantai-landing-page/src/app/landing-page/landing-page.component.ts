import { registerLocaleData } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  show = true;

  constructor() {}

  ngOnInit(): void {
    let scrollXCenter = () => {
      let overview = document.querySelector('#overview > div');
      let feature = document.querySelector('#feature > div');
      if (window.innerWidth <= 1440) {
        overview.scrollLeft = (overview.scrollWidth - window.innerWidth) / 2;
        feature.scrollLeft = (feature.scrollWidth - window.innerWidth) / 2;
      }
    };
    window.addEventListener('resize', scrollXCenter);
    window.addEventListener('load', scrollXCenter);
  }

  redirect() {
    window.location.href =
      'https://play.google.com/store/apps/details?id=com.css.rantai';
  }

  jumpto(value: string) {
    var element = document.getElementById(value);
    var offset = element.getBoundingClientRect().top - 20;
    window.scrollBy({ top: offset, behavior: 'smooth' });
  }
}
