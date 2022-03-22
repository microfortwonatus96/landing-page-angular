import { LangList, LangService } from '../service/lang.service';
// import { TranslateService } from '@ngx-translate/core';
import { ITestimoni } from '../models/testimoni.model';
import { TestimoniService } from '../service/testimoni.service';
// import { LangList, LangService } from '../service/lang.service';
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
declare var $: any;

@Component({
  selector: 'app-landing-page-v2',
  templateUrl: './landing-page-v2.component.html',
  styleUrls: ['./landing-page-v2.component.css']
})
export class LandingPageV2Component implements OnInit {
  faqPage = false;
  listImageTestimoni: ITestimoni[] = [];
  listWinnerImg: ITestimoni[] = [];
  alive: boolean = true;
  languageChange: string = '';
  agreementShow = false;
  constructor(
    public langService: LangService,
    public translate: TranslateService,
    private testimoniService: TestimoniService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.translate.addLangs(['en', 'id']);
    this.translate.setDefaultLang(this.langService.lang);
    this.router.events.subscribe((res: any) => {
      this.languageChange = localStorage.getItem('lang')
        ? localStorage.getItem('lang')
        : 'id';
      this.faqPage = false;
      this.agreementShow = false;
      this.faqPage = res.url?.includes('/faq');
      this.agreementShow = res.url?.includes('/agreements');
      if (this.agreementShow) this.faqPage = false;
      if (this.faqPage) {
        this.agreementShow = false;
        document.getElementById('block').classList.add('display-none');
        document.getElementById('block').classList.remove('display-block');
        document.getElementById('navbar').classList.add('b-navbar1');
        document.getElementById('navbar').classList.remove('b-navbar');
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
    this.loadTestimoniImage();
  }
  loadTestimoniImage() {
    this.testimoniService
      .getTestimoni()
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (res) {
          this.listImageTestimoni = [...res.content];
          // console.log('data pemenang', this.listImageTestimoni);
          this.imgToBase64();
        }
      });
  }
  imgToBase64() {
    this.listImageTestimoni.forEach((x, i) => {
      let url = `https://rantai-marketplace.com/storage/api/file/image?directory=${x.imagePath}`;

      this.testimoniService.getBase64ImageFromUrl(url).then((image: any) => {
        this.listWinnerImg.push({
          id: x.id,
          imagePath: image,
          ownerName: x.ownerName,
          ownerShop: x.ownerShop,
        });
      });
    });
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

}