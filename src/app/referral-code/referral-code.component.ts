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
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

declare let $: any;
@Component({
  selector: 'app-referral-code',
  templateUrl: './referral-code.component.html',
  styleUrls: ['./referral-code.component.css'],
})
export class ReferralCodeComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  alvieReferralRangking: boolean = true;
  show = true;
  date = new Date();
  newDate: string;
  pageSize: number = 20;
  listReferraCode: IReferralCode[] = [];
  newListCode: IReferralCode[] = [
    {
      name: null,
      phone: null,
      point: null,
    },
  ];
  dataSource: MatTableDataSource<IReferralCode>;
  // displayedColumns = ['no', 'name', 'phone', 'point'];
  displayedColumns = ['name', 'phone', 'point'];
  dtOptions: any = {};
  constructor(
    public translate: TranslateService,
    public langService: LangService,
    private referralCodeService: RefferalCodeService
  ) {
    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(this.listReferraCode);
  }

  ngOnDestroy(): void {
    this.alvieReferralRangking = false;
  }
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
    };

    this.loadData();
  }
  loadData() {
    this.referralCodeService
      .referralCode(this.pageSize)
      .pipe(takeWhile(() => this.alvieReferralRangking))
      .subscribe((response: any) => {
        if (response) {
          console.log(response);
          this.listReferraCode.push({
            ...this.newListCode,
            ...response,
          });
          this.dataSource = new MatTableDataSource(this.listReferraCode);
          this.dataSource.paginator = this.paginator;
        }
      });
    if (this.listReferraCode.length === 0) {
      this.pageSize = 0;
    }
  }
  cariData(value: string) {
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }
}
