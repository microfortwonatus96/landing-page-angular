import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { takeWhile } from 'rxjs/operators';
import { ICity } from '../models/city.model';
import { IProspectiveCustomer } from '../models/prospective-customer.model';
import { IProvince } from '../models/province.model';
import { LangList, LangService } from '../service/lang.service';
import { UserService } from '../service/user.service';
import Swal from 'sweetalert2';
import { lang } from '../lang/lang.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionService } from '../service/subscribtion.service';
import { ISubscribe } from '../models/subscribe.model';
import { RefferalCodeService } from '../service/referral-code.service';
import { IReferralCode } from '../models/referral.model';
declare var $: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('myModalClose') modalClose: ElementRef;
  show = true;
  date = new Date();
  newDate: string;
  formDaftar: FormGroup = this.formBuilder.group({
    id: null,
    name: ['', Validators.required],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
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
    address: ['', Validators.required],
  });

  get address() {
    return this.formDaftar.get('address');
  }

  alive: boolean = true;
  province: IProvince[] = [];
  city: ICity[] = [];
  businessType: string[] = [
    lang[this.langService.lang].arts,
    lang[this.langService.lang].automotive,
    lang[this.langService.lang].beauty,
    lang[this.langService.lang].book,
    lang[this.langService.lang].business,
    lang[this.langService.lang].computer,
    lang[this.langService.lang].financy,
    lang[this.langService.lang].food,
    lang[this.langService.lang].games,
    lang[this.langService.lang].healty,
    lang[this.langService.lang].hobby,
    lang[this.langService.lang].home,
    lang[this.langService.lang].internet,
    lang[this.langService.lang].jobs,
    lang[this.langService.lang].law,
    lang[this.langService.lang].news,
    lang[this.langService.lang].online,
    lang[this.langService.lang].people,
    lang[this.langService.lang].pets,
    lang[this.langService.lang].real,
    lang[this.langService.lang].science,
    lang[this.langService.lang].shopping,
    lang[this.langService.lang].sports,
    lang[this.langService.lang].travel,
    lang[this.langService.lang].others,
  ];

  othersBusinness: string = null;
  othersCity: string = null;
  save: boolean = false;
  delay: number = 3000;
  pageSize: number = 20;
  versionPacth: string;
  listBenifit: ISubscribe[] = [];
  typelistFree: any[] = [];
  typelistErp: any[] = [];
  listReferraCode: IReferralCode[] = [];
  sectionFree: IReferralCode[] = [];
  sectionPaid: IReferralCode[] = [];

  listEmpyReferral: IReferralCode[] = [];

  selectedindex: number = 0;
  indexBtnSlide: number = 1;

  constructor(
    public translate: TranslateService,
    public langService: LangService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private subscriptionService: SubscriptionService,
    private referralCodeService: RefferalCodeService
  ) {
    this.translate.addLangs(['en', 'id']);
    this.translate.setDefaultLang(this.langService.lang);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  ngAfterViewInit(): void {
    this.translate.use(this.langService.lang);
    $(document).ready(function () {
      $('.zoom-subscription').mouseover(function () {
        $(this).find('.subscribe-nonactive').addClass('subscribe-active');
        $(this).find('.subscribe-nonactive').removeClass('subscribe-nonactive');
        $(this).find('.text-muted').addClass('f-12-white');
        $(this).find('.box-medal-others').addClass('box-medal');
        $(this).find('.box-medal-others').removeClass('box-medal-others');
      });
      $('.zoom-subscription').mouseout(function () {
        $(this).find('.subscribe-active').addClass('subscribe-nonactive');
        $(this).find('.subscribe-active').removeClass('subscribe-active');
        $(this).find('.text-muted').removeClass('f-12-white');
        $(this).find('.box-medal').addClass('box-medal-others');
        $(this).find('.box-medal').removeClass('box-medal');
      });
    });
  }

  ngOnInit(): void {
    this.getProvince();
    // this.subsPackage$ = this.subsService.getPackage();
    this.tampilText();

    this.newDate = this.date.getFullYear().toString();
    let navbar = document.getElementById('navbar');
    let parallax = document.getElementById('parallax');
    let bg1 = document.getElementById('bg-1');
    let id = document.getElementById('frame-video');
    $(id).attr('src', '');
    window.onscroll = function (ev) {
      navbar.classList.add('scrolled');
      // parallax.style.backgroundSize = 100 + '%';
      // parallax.style.backgroundPosition = '0-' + window.scrollY / 2 + 'px';
      parallax.style.transform = 'translateY(' + window.scrollY / 10 + 'px)';
      bg1.style.marginBottom = '-1px';
      if (window.scrollY === 0) {
        navbar.classList.remove('scrolled');
        bg1.style.marginBottom = '-100px';
      }
    };

    this.subscriptionService
      .getPackage()
      .pipe(takeWhile(() => this.alive))
      .subscribe((response) => {
        if (response) {
          this.typelistFree = response[0].benefitList;
          this.typelistErp = response[1].benefitList;
        }
      });
    this.loadReferralCode();
    this.carouselSlider();

    for (let i = 0; i < this.pageSize; i++) {
      this.listEmpyReferral.push({
        code: null,
        email: null,
        phone: null,
        point: null,
      });
    }
    if (this.listReferraCode.length === 0) {
      this.listEmpyReferral.forEach((v, i) => {
        if (i <= 9) {
          this.sectionFree.push(v);
        }
        if (i > 9) {
          this.sectionPaid.push(v);
        }
      });
    }
  }

  goto(val) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { go: val },
      queryParamsHandling: 'merge',
    });
  }
  loadReferralCode() {
    this.referralCodeService
      .referralCode(this.pageSize)
      .pipe(takeWhile(() => this.alive))
      .subscribe((response) => {
        if (response) {
          response.forEach((v, i) => {
            if (i <= 9) this.sectionFree.push(v);
            if (i > 9) this.sectionPaid.push(v);
          });
        }
      });
  }

  getProvince() {
    this.userService
      .getProvince()
      .pipe(takeWhile(() => this.alive))
      .subscribe((response) => {
        if (response) {
          this.province = response;
          this.city = this.province.find((v) =>
            v.name.toLowerCase().includes('aceh')
          ).cityList;
        }
      });
  }
  triggerCity(event) {
    this.address.setValue(event.target.value);
    this.city = this.province.find((v) =>
      v.name.toLowerCase().includes(event.target.value.toLowerCase())
    ).cityList;
  }

  jumpto(value: string) {
    var element = document.getElementById(value);
    var offset = element.getBoundingClientRect().top - 20;
    window.scrollBy({ top: offset, behavior: 'smooth' });
  }

  showLanguage() {
    let menu_download = document.getElementById('menu-download');
    let x = document.getElementById('lang-hide');
    let y = document.getElementById('chevron');
    if (x.style.display === 'block') {
      x.style.display = 'none';
      y.style.transform = 'rotate(0deg)';
    } else {
      x.style.display = 'block';
      y.style.transform = 'rotate(180deg)';
      menu_download.style.display = 'none';
    }
  }

  changeLanguage(event: LangList) {
    let x = document.getElementById('lang-hide');
    let y = document.getElementById('chevron');
    y.style.transform = 'rotate(0deg)';
    x.style.display = 'none';
    this.langService.lang = event;
    this.translate.use(event);
    window.location.reload();
  }
  get f() {
    return this.formDaftar.controls;
  }
  submit(event: Event) {
    this.save = true;
    event.preventDefault();
    if (this.formDaftar.valid) {
      let newForm: IProspectiveCustomer = this.formDaftar.getRawValue();
      newForm.business =
        newForm.business === lang[this.langService.lang].others
          ? this.othersBusinness
          : newForm.business;
      newForm.city =
        newForm.city === lang[this.langService.lang].others
          ? this.othersCity
          : newForm.city;
      this.userService
        .createProspectiveCustomer(newForm)
        .subscribe((response) => {
          if (response) {
            this.modalClose.nativeElement.click();
            Swal.fire({
              icon: 'success',
              width: '400px',
              title: lang[this.langService.lang].success,
              text: lang[this.langService.lang].title,
            });
          }
          this.formDaftar.reset();
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: lang[this.langService.lang].error,
        width: '400px',
        text: lang[this.langService.lang].message,
      });
    }
  }

  openVideo(v: boolean) {
    let src =
      'https://www.youtube.com/embed/xk_3ptxZECg?autoplay=1&amp;modestbranding=1&amp;showinfo=0';
    let id = document.getElementById('frame-video');
    if (v) {
      $(id).attr('src', '');
    } else {
      $(id).attr('src', src);
    }
  }
  download() {
    let id = document.getElementById('menu-download');
    let y = document.getElementById('chevron1');
    let x = document.getElementById('lang-hide');
    if (id.style.display == 'block') {
      id.style.display = 'none';
      y.style.transform = 'rotate(0deg)';
    } else {
      id.style.display = 'block';
      y.style.transform = 'rotate(180deg)';
      x.style.display = 'none';
    }
  }

  tampilText() {
    const url = 'https://rantai.tech/file/ver.txt';
    fetch(url)
      .then((r) => r.text())
      .then((t) => (this.versionPacth = t));
  }

  btnSlide(idx) {
    var i;
    var slides = document.getElementsByClassName('carousel');
    var dots = document.getElementsByClassName('form-check-input');
    if (idx > slides.length) {
      this.indexBtnSlide = 1;
    }
    if (idx < 1) {
      this.indexBtnSlide = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      (<HTMLElement>slides[i]).style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active-slider', '');
    }
    (<HTMLElement>slides[this.indexBtnSlide - 1]).style.display = 'block';
    dots[this.indexBtnSlide - 1].className += ' active-slider';
  }
  carouselSlider() {
    let i;
    let slides = document.getElementsByClassName('carousel');
    let dots = document.getElementsByClassName('form-check-input');
    for (i = 0; i < slides.length; i++) {
      (<HTMLElement>slides[i]).style.display = 'none';
    }
    this.selectedindex++;
    if (this.selectedindex > slides.length) {
      this.selectedindex = 1;
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active-slider', '');
    }
    (<HTMLElement>slides[this.selectedindex - 1]).style.display = 'block';
    dots[this.selectedindex - 1].className += ' active-slider';
    setTimeout(() => {
      this.carouselSlider();
    }, 5000);
  }
}
