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
export class ReferralCodeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  alvieReferralRangking: boolean = true;
  show = true;
  date = new Date();
  newDate: string;
  pageSize: number = 20;
  listReferraCode: IReferralCode[] = [];
  dataSource: MatTableDataSource<any>;
  // displayedColumns = ['no', 'name', 'phone', 'point'];
  displayedColumns = ['id', 'name', 'phone', 'point'];
  dtOptions: any = {};
  constructor(
    public translate: TranslateService,
    public langService: LangService,
    private referralCodeService: RefferalCodeService
  ) {
    const users: UserData[] = [];
    for (let i = 1; i <= 100; i++) {
      users.push(createNewUser(i));
    }

    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
  }

  ngOnDestroy(): void {
    this.alvieReferralRangking = false;
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
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
      .subscribe((response) => {
        if (response) {
          this.listReferraCode = response;
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
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
  };
}
const COLORS = [
  'maroon',
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'purple',
  'fuchsia',
  'lime',
  'teal',
  'aqua',
  'blue',
  'navy',
  'black',
  'gray',
];
const NAMES = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];
export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
