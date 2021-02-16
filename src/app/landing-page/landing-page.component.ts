import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { takeWhile } from 'rxjs/operators';
import { ICity } from '../models/city.model';
import { IProspectiveCustomer } from '../models/prospective-customer.model';
import { IProvince } from '../models/province.model';
import { LangList, LangService } from '../service/lang.service';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit, AfterViewInit, OnDestroy {
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
    business: ['Arts & Entertainment (Seni & Hiburan)', Validators.required],
    province: ['Aceh', Validators.required],
    city: ['Kab. Simeulue', Validators.required],
  });

  alive: boolean = true;
  province: IProvince[] = [];
  city: ICity[] = [];
  businessType: string[] = [
    'Arts & Entertainment (Seni & Hiburan)',
    'Automotive (Otomotif)',
    'Beauty & Fitness (Kecantikan & Kesehatan)',
    'Books & Literature (Buku & Literatur)',
    'Business & Industrial Markets (Bisnis & Pasar Industri)',
    'Computer & Electronics (Komputer & Elektronik)',
    'Finance (Keuangan)',
    'Food & Drink (Makanan & Minuman)',
    'Games (Permainan)',
    'Healthcare (Kesehatan)',
    'Hobbies & Leisure (Hobi & Kenyamanan)',
    'Home & Garden (Rumah & Taman)',
    'Internet & Telecom (Internet & Telekomunikasi)',
    'Jobs & Education (Pekerjaan & Pendidikan)',
    'Law & Government (Hukum & Pemerintahan)',
    'News (Berita)',
    'Online Communities (Komunitas Online)',
    'People & Society (Orang & Masyarakat)',
    'Pets & Animals (Peliharaan & Hewan)',
    'Real Estate (Perumahaan)',
    'Science (Ilmu Pengetahuan)',
    'Shopping (Belanja)',
    'Sports (Olahraga)',
    'Travel (Perjalanan)',
    'Others (Lainnya)',
  ];

  othersBusinness: string = null;
  othersCity: string = null;

  constructor(
    public translate: TranslateService,
    public langService: LangService,
    private formBuilder: FormBuilder,
    private userService: UserService
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
    this.city = this.province.find((v) =>
      v.name.toLowerCase().includes(event.target.value.toLowerCase())
    ).cityList;
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
    console.log(this.formDaftar);
    if (this.formDaftar.valid) {
      let newForm: IProspectiveCustomer = this.formDaftar.getRawValue();
      newForm.business =
        newForm.business === 'Others (Lainnya)'
          ? this.othersBusinness
          : newForm.business;
      newForm.city =
        newForm.city === 'Others (Lainnya)' ? this.othersCity : newForm.city;
      this.userService
        .createProspectiveCustomer(newForm)
        .subscribe((response) => {
          if (response) {
            // close modal
            // Insert modal baru untuk confirmation berhasil
          }
        });
    } else {
    }
  }
}
