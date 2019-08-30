import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isMenu = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goTo(page: string) {
    this.router.navigate([`/${page}`]).then(() => {
      setTimeout(() => {
        this.isMenu = false;
      }, 1000);

    });
  }

  showMenu() {
    this.isMenu = !this.isMenu;
  }

}
