import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  slides: any[] = new Array(3).fill({ id: -1, src: '', title: ''});

  constructor() { }

  ngOnInit(): void {
    this.slides[0] = {
      src: "../../assets/logoSofkaU.webp",
      title: "Logo Sofka U"
    };
    this.slides[1] = {
      src: "../../assets/logoSofka.png",
      title: "Logo Sofka"
    }
    this.slides[2] = {
      src: "../../assets/logoArgentinaPrograma.png",
      title: "Logo Argentina Programa"
    }
  }
}
