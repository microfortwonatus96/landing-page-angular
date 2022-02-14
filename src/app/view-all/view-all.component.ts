import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {

  activeImage:string[] = []
  listcontentGalery: string[] = [];

  constructor() { }

  ngOnInit(): void {
    
  }

}
