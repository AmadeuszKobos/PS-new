import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';


@Component({
  selector: 'app-lately-modified',
  standalone: true,
  imports: [CommonModule, CarouselModule, ButtonModule, TagModule],
  templateUrl: './lately-modified.component.html',
  styleUrls: ['./lately-modified.component.css', '../../dashboard.component.css']
})
export class LatelyModifiedComponent implements OnInit{
  latelyModifiedItems: any[] =[];



  responsiveOptions: any[] | undefined;

  ngOnInit(): void {
    this.latelyModifiedItems = [
      {name: "ItemName", date: "15/10/2001"},
      {name: "ItemName", date: "15/10/2001"},
      {name: "ItemName", date: "15/10/2001"},
      {name: "ItemName",  date: "15/10/2001"}
    ]

    this.responsiveOptions = [
      {
          breakpoint: '1500px',
          numVisible: 3,
          numScroll: 1
      },
      {
          breakpoint: '1100px',
          numVisible: 3,
          numScroll: 1
      },
      {
          breakpoint: '1050px',
          numVisible: 1,
          numScroll: 1
      }
    ];
  }
}
