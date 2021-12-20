import {
  Component,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { takeWhile } from 'rxjs/operators';
import { IReferralCode } from '../models/referral.model';
import { LangService } from '../service/lang.service';
import { RefferalCodeService } from '../service/referral-code.service';

declare let $: any;
@Component({
  selector: 'app-referral-code',
  templateUrl: './referral-code.component.html',
  styleUrls: ['./referral-code.component.css'],
})
export class ReferralCodeComponent implements OnInit, OnDestroy, AfterViewInit {
  alvieReferralRangking: boolean = true;
  show = true;
  date = new Date();
  newDate: string;
  pageSize: number = 20;
  listReferraCode: IReferralCode[] = [];
  dtOptions: any = {};
  constructor(
    public translate: TranslateService,
    public langService: LangService,
    private referralCodeService: RefferalCodeService
  ) {}

  ngOnDestroy(): void {
    this.alvieReferralRangking = false;
  }
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    this.translate.use(this.langService.lang);
    this.newDate = this.date.getFullYear().toString();
    let navbar = document.getElementById('navbar');
    let parallax = document.getElementById('parallax');
    let bg1 = document.getElementById('bg-1');
    let id = document.getElementById('frame-video');
    $(id).attr('src', '');
    window.onscroll = function (ev) {
      navbar.classList.add('scrolled');
      parallax.style.transform = 'translateY(' + window.scrollY / 10 + 'px)';
      bg1.style.marginBottom = '-1px';
      if (window.scrollY === 0) {
        navbar.classList.remove('scrolled');
        bg1.style.marginBottom = '-100px';
      }
    };

    this.loadData();
  }
  loadData() {
    this.referralCodeService
      .referralCode(this.pageSize)
      .pipe(takeWhile(() => this.alvieReferralRangking))
      .subscribe((response) => {
        if (response) {
          this.listReferraCode = response;
          // this.dataSource = new MatTableDataSource(this.listReferraCode);
        }
      });
  }
}
