import { registerLocaleData } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { IProvince } from '../models/province.model';
import { LangList, LangService } from '../service/lang.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  show = true;
  date = new Date();
  newDate: string;
  formDaftar: FormGroup = this.formBuilder.group({
    id: null,
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.maxLength(16),
      ],
    ],
    business: ['', Validators.required],
    province: ['', Validators.required],
    city: ['', Validators.required],
  });

  province$: Observable<IProvince[]>;
  constructor(
    public translate: TranslateService,
    public langService: LangService,
    private formBuilder: FormBuilder
  ) {
    this.translate.addLangs(['en', 'id']);
    this.translate.setDefaultLang(this.langService.lang);
  }

  ngAfterViewInit(): void {
    this.translate.use(this.langService.lang);
  }
  ngOnInit(): void {
    this.newDate = this.date.getFullYear().toString();
    let navbar = document.getElementById('navbar');
    window.onscroll = function (ev) {
      navbar.classList.add('scrolled');
      if (window.scrollY === 0) {
        navbar.classList.remove('scrolled');
      }
    };
    // let scrollXCenter = () => {
    //   let overview = document.querySelector('#overview > div');
    //   let feature = document.querySelector('#feature > div');
    //   if (window.innerWidth <= 1440) {
    //     overview.scrollLeft = (overview.scrollWidth - window.innerWidth) / 2;
    //     feature.scrollLeft = (feature.scrollWidth - window.innerWidth) / 2;
    //   }
    // };
    // window.addEventListener('resize', scrollXCenter);
    // window.addEventListener('load', scrollXCenter);
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
  changeLanguage(event: LangList) {
    this.langService.lang = event;
    this.translate.use(event);
    window.location.reload();
  }
  submit() {
    let newFormData = this.formDaftar.getRawValue();
    console.log('submit', newFormData);
  }
}
