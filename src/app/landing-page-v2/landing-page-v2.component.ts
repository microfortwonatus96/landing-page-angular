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
import {
  ActivatedRoute,
  ActivationEnd,
  NavigationEnd,
  Router,
} from '@angular/router';
import { SubscriptionService } from '../service/subscribtion.service';
import { ISubscribe } from '../models/subscribe.model';
import { RefferalCodeService } from '../service/referral-code.service';
import {
  IReferralCode,
  IReferralEvent,
  TermCondition,
} from '../models/referral.model';
import { GaleryService } from '../service/customer-galery.service';
import { Galery } from '../models/galery.model';
import { CountdownEventService } from '../service/countdown-event.service';
// import { TestimoniService } from '../service/testimoni.service';
// import { ITestimoniv2 } from '../models/testimoni.model';
declare var $: any;

@Component({
  selector: 'app-landing-page-v2',
  templateUrl: './landing-page-v2.component.html',
  styleUrls: ['./landing-page-v2.component.css'],
})
export class LandingPageV2Component implements OnInit {
  faqPage = false;
  privacyPage = false;
  dataContent = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium impedit omnis incidunt ratione ea libero vel, cumque perspiciatis repellendus deserunt.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium impedit omnis incidunt ratione ea libero vel, cumque perspiciatis repellendus deserunt.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium impedit omnis incidunt ratione ea libero vel, cumque perspiciatis repellendus deserunt.',
    'dLorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium impedit omnis incidunt ratione ea libero vel, cumque perspiciatis repellendus deserunt.',
    'e',
    'f',
  ];
  // listImageTestimoni: ITestimoniv2[] = [];
  // listWinnerImg: ITestimoniv2[] = [];
  alive: boolean = true;
  languageChange: string = '';
  agreementShow = false;
  faqSideLeft = [];
  faqSideRight = [];
  all_testimony: any = [
    {
      id: 0,
      desc: 'Maecenas interdum lorem eleifend orci aliquam mollis. Aliquam non rhoncus magna. Suspendisse aliquet tincidunt enim, ut commodo elit feugiat et. Maecenas nec enim quis diam faucibus tristique.',
      name: 'Ini nama pelanggan 1',
      shopName: 'Ini nama toko',
      img: 'icon-img-testimoni',
    },
    {
      id: 1,
      desc: 'Maecenas interdum lorem eleifend orci aliquam mollis. Aliquam non rhoncus magna. Suspendisse aliquet tincidunt enim, ut commodo elit feugiat et. Maecenas nec enim quis diam faucibus tristique.',
      name: 'Ini nama pelanggan 2',
      shopName: 'Ini nama toko',
      img: 'icon-img-testimoni',
    },
    {
      id: 2,
      desc: 'Maecenas interdum lorem eleifend orci aliquam mollis. Aliquam non rhoncus magna. Suspendisse aliquet tincidunt enim, ut commodo elit feugiat et. Maecenas nec enim quis diam faucibus tristique.',
      name: 'Ini nama pelanggan 3',
      shopName: 'Ini nama toko',
      img: 'icon-img-testimoni',
    },
    {
      id: 3,
      desc: 'Maecenas interdum lorem eleifend orci aliquam mollis. Aliquam non rhoncus magna. Suspendisse aliquet tincidunt enim, ut commodo elit feugiat et. Maecenas nec enim quis diam faucibus tristique.',
      name: 'Ini nama pelanggan 4',
      shopName: 'Ini nama toko',
      img: 'icon-img-testimoni',
    },
    {
      id: 4,
      desc: 'Maecenas interdum lorem eleifend orci aliquam mollis. Aliquam non rhoncus magna. Suspendisse aliquet tincidunt enim, ut commodo elit feugiat et. Maecenas nec enim quis diam faucibus tristique.',
      name: 'Ini nama pelanggan 5',
      shopName: 'Ini nama toko',
      img: 'icon-img-testimoni',
    },
  ];
  arr_testimony = [];
  sectionTestimony: boolean = false;
  versionPacth: string;

  constructor(
    public langService: LangService,
    public translate: TranslateService,
    // private testimoniService: TestimoniService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.translate.addLangs(['en', 'id']);
    this.translate.setDefaultLang(this.langService.lang);
    this.router.events.subscribe((res: any) => {
      this.languageChange = localStorage.getItem('lang')
        ? localStorage.getItem('lang')
        : 'id';
      this.faqPage = false;
      this.agreementShow = false;
      this.privacyPage = false;
      this.faqPage = res.url?.includes('/faq');
      this.privacyPage = res.url?.includes('/privacy');
      this.agreementShow = res.url?.includes('/agreements');

      if (this.agreementShow || this.privacyPage) this.faqPage = false;
      if (this.agreementShow || this.faqPage) this.privacyPage = false;
      if (this.privacyPage || this.faqPage) this.agreementShow = false;

      if (this.faqPage) {
        this.agreementShow = false;
        document.getElementById('block').classList.add('display-none');
        document.getElementById('block').classList.remove('display-block');
        document.getElementById('navbar').classList.add('b-navbar1');
        document.getElementById('navbar').classList.remove('b-navbar1');
        document
          .getElementById('navbar-t')
          .classList.add('navbar-toggler-icon1');
        document
          .getElementById('navbar-t')
          .classList.remove('navbar-toggler-icon');
        $('html, body').animate(
          {
            scrollTop: 0,
          },
          'slow'
        );
      }

      if (this.privacyPage) {
        this.activatedRoute.queryParams.subscribe((re) => {
          if (re['lang'] === 'en' || re['lang'] === 'id') {
            $('html, body').animate(
              {
                scrollTop: 0,
              },
              'slow'
            );
          }
        });
      }
      if (this.agreementShow) {
        this.activatedRoute.queryParams.subscribe((re) => {
          if (re['lang'] === 'en' || re['lang'] === 'id') {
            $('html, body').animate(
              {
                scrollTop: 0,
              },
              'slow'
            );
          }
        });
      }
      this.activatedRoute.queryParams.subscribe((res) => {
        if (res['lang']) {
          this.languageChange = res['lang'];
          this.langService.lang = res['lang'];
        }
      });
    });
  }

  ngOnInit(): void {
    // this.loadTestimoniImage();
    this.loadContentFaq();
    this.updateArray(0);

    //setting slider
    const slider = document.querySelector('.slider-testimoni');
    const indicatorParent = document.querySelector('.dot ul');
    const indicators = document.querySelectorAll('.dot li');

    indicators.forEach((indicator, i) => {
      indicator.addEventListener('click', () => {
        document.querySelector('.dot .selected').classList.remove('selected');
        indicator.classList.add('selected');
        (<HTMLElement>slider).style.transform = 'translateX(' + i * -13 + '%)';
        (<HTMLElement>slider).style.transition = '0.5s ease-out';
        this.updateArray(i);
      });
    });

    this.tampilText();

    //scroll efect
    window.addEventListener('scroll', this.scrollEffect);
    this.scrollEffect();
  }

  scrollEffect() {
    var effectscrl = document.querySelectorAll('.scroller-section');
    for (var i = 0; i < effectscrl.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = effectscrl[i].getBoundingClientRect().top;
      var elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        effectscrl[i].classList.add('active');
      } else {
        effectscrl[i].classList.remove('active');
      }
    }
  }

  checkOdd(n: number) {
    return n % 2;
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
  updateArray(idx) {
    this.arr_testimony = [];
    let looping = idx + 3;
    for (let c = 0; c < looping; c++) {
      let getIdx = c + idx;
      if (getIdx > this.all_testimony.length) {
        this.resetArray(0);
      } else {
        this.arr_testimony.push(this.all_testimony[getIdx]);
      }
    }
  }
  resetArray(idx) {
    this.arr_testimony = [];
    let looping = idx + 3;
    for (let c = 0; c < looping; c++) {
      let getIdx = c + idx;
      this.arr_testimony.push(this.all_testimony[getIdx]);
    }
  }

  // loadTestimoniImage() {
  //   this.testimoniService
  //     .getTestimoni()
  //     .pipe(takeWhile(() => this.alive))
  //     .subscribe((res: any) => {
  //       if (res) {
  //         this.listImageTestimoni = [...res.content];
  //         this.imgToBase64();
  //       }
  //     });
  // }
  // imgToBase64() {
  //   this.listImageTestimoni.forEach((x, i) => {
  //     let url = `https://rantai-marketplace.com/storage/api/file/image?directory=${x.imagePath}`;

  //     this.testimoniService.getBase64ImageFromUrl(url).then((image: any) => {
  //       this.listWinnerImg.push({
  //         id: x.id,
  //         imagePath: image,
  //         ownerName: x.ownerName,
  //         ownerShop: x.ownerShop,
  //       });
  //     });
  //   });
  // }
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
  selengkapnya() {
    this.router.navigate(['faq'], {
      queryParams: {
        lang: this.langService.lang,
      },
      queryParamsHandling: 'merge',
    });
  }

  openAgreements() {
    this.router.navigate(['agreements'], {
      queryParams: {
        lang: this.langService.lang,
      },
      queryParamsHandling: 'merge',
    });
  }
  policyPrivacy() {
    this.router.navigate(['privacy'], {
      queryParams: {
        lang: this.langService.lang,
      },
      queryParamsHandling: 'merge',
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
}
