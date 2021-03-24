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

  constructor(
    public translate: TranslateService,
    public langService: LangService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.translate.addLangs(['en', 'id']);
    this.translate.setDefaultLang(this.langService.lang);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  ngAfterViewInit(): void {
    this.translate.use(this.langService.lang);
  }

  ngOnInit(): void {
    this.getProvince();
    this.newDate = this.date.getFullYear().toString();
    let navbar = document.getElementById('navbar');
    window.onscroll = function (ev) {
      navbar.classList.add('scrolled');
      if (window.scrollY === 0) {
        navbar.classList.remove('scrolled');
      }
    };
  }

  goto(val) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { go: val },
      queryParamsHandling: 'merge',
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

  changeLanguage(event: LangList) {
    this.langService.lang = event;
    this.translate.use(event);
    window.location.reload();
  }

  submit(event: Event) {
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
      console.log('save', newForm);
      this.userService
        .createProspectiveCustomer(newForm)
        .subscribe((response) => {
          if (response) {
            // close modal
            this.modalClose.nativeElement.click();
            // Insert modal baru untuk confirmation berhasil
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
}
