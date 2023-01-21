import { Component, OnInit , HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  @HostListener('window:scroll') onScroll(e: Event): void {
    this.getYPosition(e)
 }
  constructor() { }

  ngOnInit(): void {
  }
  getYPosition(e: Event) {
    let element = document.querySelector('.navbar') as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('navbar-inverse');
    } else {
      element.classList.remove('navbar-inverse');
    }
  }
}
