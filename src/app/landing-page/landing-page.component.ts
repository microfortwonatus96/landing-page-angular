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
import {
  IReferralCode,
  IReferralEvent,
  TermCondition,
} from '../models/referral.model';
import { GaleryService } from '../service/customer-galery.service';
import { Galery, ITestimoni } from '../models/galery.model';
import { CountdownEventService } from '../service/countdown-event.service';
declare var $: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('myModalClose') modalClose: ElementRef;

  readMore = false;
  selecedContent = '';
  dataContent = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium impedit omnis incidunt ratione ea libero vel, cumque perspiciatis repellendus deserunt.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium impedit omnis incidunt ratione ea libero vel, cumque perspiciatis repellendus deserunt.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium impedit omnis incidunt ratione ea libero vel, cumque perspiciatis repellendus deserunt.',
    'dLorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium impedit omnis incidunt ratione ea libero vel, cumque perspiciatis repellendus deserunt.',
    'e',
    'f',
  ];
  show = true;
  date = new Date();
  newDate: string;
  viewAll = false;
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

  searchForm: FormGroup = this.formBuilder.group({
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.maxLength(16),
      ],
    ],
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
  listReferralCode: IReferralEvent[] = [];
  referralEvent: IReferralEvent = {
    dateCreated: null,
    dateFrom: null,
    dateTo: null,
    dateUpdated: null,
    description: null,
    id: null,
    lastModifiedBy: null,
    log: [],
    name: null,
    termAndConditions: [],
    title: null,
  };

  termCondition: TermCondition[];

  listEmpyReferral: IReferralCode[] = [];

  selectedindex: number = 0;
  indexBtnSlide: number = 1;
  price: number;
  color: string = 'blue';
  phoneNumber: string = '';
  resultSearch: IReferralCode[] = [];
  dataNotFound: boolean;
  autoFocus: boolean = false;
  nameGambar: string = '';
  nextNameGambar: string = '';
  nextIndex: number = 0;
  activeImage: string[] = [];

  // lastBox = -1;

  faqSideLeft = [];
  faqSideRight = [];
  listcontentGalery: string[] = [];
  listGaleryTestimoni: ITestimoni[] = [];
  setColor: boolean = false;
  showMore: boolean = false;
  timeServer: number;
  // mainPage: boolean

  // countdown event
  setIntervalAlive;

  autoWaktuSelesai: {
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
    timestamp: number;
  } = {
    day: null,
    hours: null,
    minutes: null,
    seconds: null,
    timestamp: null,
  };
  constructor(
    public translate: TranslateService,
    public langService: LangService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private subscriptionService: SubscriptionService,
    private referralCodeService: RefferalCodeService,
    private galeryService: GaleryService,
    private countDownService: CountdownEventService
  ) {
    this.translate.addLangs(['en', 'id']);
    this.translate.setDefaultLang(this.langService.lang);
  }
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  randomUrl() {
    let r = Math.floor(Math.random() * this.listcontentGalery.length);
    let str = this.listcontentGalery[r];

    if (!this.activeImage.includes(str)) {
      let ranNum = Math.floor(Math.random() * this.activeImage.length);
      this.activeImage[ranNum] = str;
    } else {
      this.randomUrl();
    }
  }

  settingArray() {
    setInterval(() => {
      this.randomUrl();
    }, 7000);
  }
  ngOnDestroy(): void {
    this.alive = false;
    clearInterval(this.setIntervalAlive);
  }

  checkOdd(n: number) {
    // console.log("aa")
    return n % 2;
  }
  loadTimeServer() {
    this.referralCodeService
      .findTimeServer()
      .pipe(takeWhile(() => this.alive))
      .subscribe((res) => {
        if (res) {
          this.timeServer = +res;
        }
      });
  }
  countTimerEvent() {
    this.setIntervalAlive = setInterval((v) => {
      this.autoWaktuSelesai.timestamp -= 1;
      this.autoWaktuSelesai = {
        ...this.countDownService.secondsToDhms(
          +this.autoWaktuSelesai.timestamp,
          this.timeServer
        ),
        timestamp: +this.autoWaktuSelesai.timestamp,
      };

      if (this.autoWaktuSelesai.timestamp < 0) {
        clearInterval(this.setIntervalAlive);
      }
    }, 1000);
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
    this.readMore = false;
    this.activatedRoute.queryParams.subscribe((re) => {
      if (re) {
        this.readMore = re['faq'] !== undefined;
        if (this.readMore) {
          document.getElementById('block').classList.add('display-none');
          document.getElementById('block').classList.remove('display-block');
          document.getElementById('navbar').classList.add('b-navbar1');
          document.getElementById('navbar').classList.remove('b-navbar');
          document.getElementById('navbar-t').classList.add('navbar-toggler-icon1');
          document.getElementById('navbar-t').classList.remove('navbar-toggler-icon');

          // $('html, body').animate({ scrollTop: 0 }, 'slow');
          $('html, body').animate(
            {
              scrollTop: 0,
            },
            'slow'
          );

          //mobile version
          //id=main ilang  > scrollTop
        } else {
          document.getElementById('block').classList.remove('display-none');
          document.getElementById('block').classList.add('display-block');
        }
      }
    });

    this.settingArray();
    this.getProvince();
    this.tampilText();

    this.newDate = this.date.getFullYear().toString();
    let navbar = document.getElementById('navbar');
    let parallax = document.getElementById('parallax');
    // let bg1 = document.getElementById('bg-1');
    let id = document.getElementById('frame-video');
    $(id).attr('src', '');
    window.onscroll = function (ev) {
      navbar.classList.add('scrolled');
      // parallax.style.backgroundSize = 100 + '%';
      // parallax.style.backgroundPosition = '0-' + window.scrollY / 2 + 'px';
      parallax.style.transform = 'translateY(' + window.scrollY / 20 + 'px)';
      // bg1.style.marginBottom = '-1px';
      if (window.scrollY === 0) {
        navbar.classList.remove('scrolled');
        // bg1.style.marginBottom = '-100px';
      }
    };

    this.subscriptionService
      .getPackage()
      .pipe(takeWhile(() => this.alive))
      .subscribe((response) => {
        if (response) {
          this.price = response[1]?.price;
          this.typelistFree = response[0].benefitList;
          this.typelistErp = response[1].benefitList;
        }
      });
    this.loadEvent();
    this.loadReferralCode();
    // this.carouselSlider();
    this.loadEventTerms();
    this.loadContentFaq();
    this.loadGaleryImage();
    this.loadTimeServer();
  }

  loadGaleryImage() {
    this.galeryService
      .getGalery()
      .pipe(takeWhile(() => this.alive))
      .subscribe((response: any) => {
        if (response) {
          this.listcontentGalery = [...response.content];
          this.listGaleryTestimoni = [...response.content];
          // console.log("data galeri", this.listGaleryTestimoni)
          for (let i = 0; i < 8; i++) {
            this.activeImage.push(this.listcontentGalery[i]);
          }
        }
      });
  }

  loadContentFaq() {
    this.dataContent.forEach((v, idx) => {
      for (let i = 0; i < 20; i++) {
        if (i < 10) {
        } else {
          let idx2 = i - 10;
        }
      }
    });
  }

  loadEvent() {
    this.referralCodeService
      .currentEvent()
      .pipe(takeWhile(() => this.alive))
      .subscribe((response) => {
        if (response) {
        }
      });
  }

  goto(val) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { go: val },
      queryParamsHandling: 'merge',
    });
  }
  loadReferralCode(phone?: string) {
    if (!phone) {
      this.resultSearch = [];
      this.referralCodeService
        .referralCode(this.pageSize)
        .pipe(takeWhile(() => this.alive))
        .subscribe((response) => {
          if (response) {
            this.dataNotFound = false;
            for (let i = 0; i < 20; i++) {
              if (i < 10) {
                this.sectionFree[i] = {
                  name: response[i]?.name,
                  phone: response[i]?.phone,
                  point: response[i]?.point,
                };
              } else {
                let idx2 = i - 10;
                this.sectionPaid[idx2] = {
                  name: response[i]?.name,
                  phone: response[i]?.phone,
                  point: response[i]?.point,
                };
              }
            }
          }
        });
    } else {
      this.referralCodeService
        .referralCode(this.pageSize, phone)
        .pipe(takeWhile(() => this.alive))
        .subscribe((response) => {
          if (response) {
            this.sectionFree = [];
            this.sectionPaid = [];
            this.resultSearch = response;
          }
          if (response.length == 0) {
            this.dataNotFound = true;
            this.sectionFree = [];
            this.sectionPaid = [];
          }
        });
    }
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

  loadEventTerms() {
    this.referralCodeService
      .currentEvent()
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (res) {
          this.autoWaktuSelesai = {
            ...this.countDownService.secondsToDhms(
              +res.dateTo,
              this.timeServer
            ),
            timestamp: +res.dateTo,
          };

          this.countTimerEvent();

          this.listReferralCode.push({
            ...this.referralEvent,
            ...res,
          });
          this.listReferralCode.forEach((v, i) => {
            this.termCondition = v.termAndConditions;
            this.checkLink();
          });
        }
      });
  }

  checkLink() {
    // let deskripsi:string = ''
    this.termCondition.forEach((v, i) => {
      v.urlText = [];
      if (v.startIndex) {
        let start = v.description.substring(0, v.startIndex);
        let url = v.description.substring(v.startIndex, v.lastIndex + 1);
        let end = v.description.substring(
          v.lastIndex + 1,
          v.description.length
        );
        v.urlText.push({ text: start });
        v.urlText.push({ text: url, link: v.deepLink });
        v.urlText.push({ text: end });
      } else {
        v.urlText.push({
          text: v.description,
        });
      }
    });
  }
  search(event: Event) {
    if (this.searchForm.valid) {
      this.dataNotFound = false;
      this.phoneNumber = this.searchForm.get('phone').value;
      while (this.phoneNumber.charAt(0) === '0') {
        this.phoneNumber = this.phoneNumber.substring(1);
      }
      this.loadReferralCode(this.phoneNumber);
    }
  }
  clear($event) {
    if (this.searchForm.get('phone').value === '') {
      this.loadReferralCode();
    }
  }

  more(event) {
    // console.log("test", event);
    if (event) return (this.showMore = false);
    this.showMore = true;
  }

  selengkapnya() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        faq: 'true',
      },

      queryParamsHandling: 'merge',

      // preserve the existing query params in the route
    });
  }

  // destroyReadMore(){
  //   this.mainPage = true;
  //   localStorage.setItem('more', this.mainPage.toString());
  // }
  // checkPage(){
  //   let statusPage = localStorage.getItem('more')
  //   // console.log("test", statusPage);
  //   if(statusPage == undefined) {
  //     this.mainPage = true;
  //   }else {
  //     if(statusPage == 'true'){
  //       // console.log("true")
  //       this.mainPage = true;
  //     }else  {
  //       // console.log("false")
  //       this.mainPage = false;
  //     }
  //   }
  // }
}
