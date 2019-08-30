import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { OverlayPanel } from 'primeng/overlaypanel';

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
  panelVotar: OverlayPanel;
  eventPanel: any;

  descripcion = true;
  integrantes = false;
  docentes = false;
  galeria = false;

  constructor() { }

  ngOnInit() {
  }

  showModal() {
    this.isModal = !this.isModal;
  }

  openVotar(event: any, proyecto: any, panel: OverlayPanel) {
    this.panelVotar = panel;
    this.eventPanel = event;
    panel.toggle(event);
  }
  votar(panel: OverlayPanel) {
    panel.hide();
    console.log('votaste');
  }

  changeTab(tab: string) {
    switch (tab) {
      case 'descripcion':
        this.descripcion = true;
        this.integrantes = false;
        this.docentes = false;
        this.galeria = false;
        break;

      case 'integrantes':
        this.integrantes = true;
        this.docentes = false;
        this.galeria = false;
        this.descripcion = false;
        break;

      case 'docentes':
        this.docentes = true;
        this.galeria = false;
        this.descripcion = false;
        this.integrantes = false;
        break;

      case 'galeria':
        this.galeria = true;
        this.descripcion = false;
        this.integrantes = false;
        this.docentes = false;
        break;

      default:
        this.descripcion = true;
        this.integrantes = false;
        this.docentes = false;
        break;
    }
  }

}
