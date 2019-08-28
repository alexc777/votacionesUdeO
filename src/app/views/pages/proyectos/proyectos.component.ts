import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ top: '-30%' }),
            animate('0.2s ease-out',
            style({ top: 0 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ top: 0 }),
            animate('0.2s ease-in',
            style({ top: '-30%' }))
          ]
        )
      ]
    )
  ]
})
export class ProyectosComponent implements OnInit {

  isModal = false;

  constructor() { }

  ngOnInit() {
  }

  showModal() {
    this.isModal = !this.isModal;
  }



}
