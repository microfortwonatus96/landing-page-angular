import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  showMore: boolean = false;
  @Input() content: string
  @Input() title: string
  constructor() { }

  ngOnInit(): void {
  }

  more(event) {
    console.log("test", event);
    if(event) return this.showMore =false;
    this.showMore = true;

    
  }

}
