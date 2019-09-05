import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ProyectoService } from '../../../services/proyecto.service';
import { Proyecto } from '../../../models/proyecto';
import { DomSanitizer } from '@angular/platform-browser';

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


  /*Modelos*/
  public proyecto: Proyecto;
  proyectos: Array<Proyecto>;
  public proyectoSeleccionado:any;
  public galeriaTest:Array<any>;

  constructor(private proyectoService: ProyectoService, private sanitizer: DomSanitizer) { }

  transform(image: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }
  ngOnInit() {
    this.getProyectos();
    this.galeriaTest = [];

    

  }

  showModal(proyecto:any) {
    this.proyectoSeleccionado = proyecto;
    this.isModal = !this.isModal;
  }

  getProyectos() {
    this.proyectoService.getProyectos().subscribe(
      (result) => {
        this.proyectos = result;
        this.proyectos.forEach(proyecto => {
          proyecto.alumnos = [];
          proyecto.catedraticos = [];
          proyecto.galeriaFinal = [];
          /*Se consume el servicio para obtener las fotografias*/
          this.proyectoService.getGaleriaProyecto(proyecto.id).subscribe(
            (result) => {
              proyecto.galeria = result.galeria;
              /*Se recorre la galeria de cada proyecto para obtener un path correcto*/
              proyecto.galeria.forEach(fotografia => {
                fotografia.path = "data:image/png;base64," + fotografia.archivo;
                let foto:any = {};
                foto.source = this.transform("data:image/png;base64," + fotografia.archivo)
                foto.alt = fotografia.titulo;
                foto.title = fotografia.titulo;
                this.galeriaTest.push(foto);
                proyecto.galeriaFinal.push(foto);
              });
             

            }
          );
          /*Se consume el servicio para obtener las categorias del proyecto */
          this.proyectoService.getCategoriasProyecto(proyecto.id).subscribe(
            (result) => {
              proyecto.categorias = result.asignaciones;
              proyecto.categorias.forEach(categoria => {
                this.proyectoService.getCategoria(categoria.id).subscribe(
                  result => {
                    categoria.nombre = result.categorias.nombre;
                    categoria.descripcion = result.categorias.descripcion;
                  }
                );
              });
            }
          );

          /*Se consume el servicio para obtener los integrantes del proyecto alumnos y docentes */
          this.proyectoService.getIntegrantesProyecto(proyecto.id).subscribe(
            (result) => {
              result.integrantes.forEach(usuario => {
                /* Se recorre el resultado de integrantes por proyecto para obtener los atributos*/
                this.proyectoService.getUsuarioPorId(usuario.usuario_id).subscribe(
                  result => {
                    //console.log(result);
                    if (result.usuario.role == 'Alumno') {
                      let alumno: any = {};
                      alumno.nombreCompleto = result.usuario.primer_nombre + ' '+ result.usuario.segundo_nombre +' '+
                        result.usuario.primer_nombre +' '+ result.usuario.otros_nombre +' '+
                        result.usuario.primer_apellido +' '+ result.usuario.segundo_apellido;
                        alumno.profesion = result.usuario.profesion;
                        alumno.descripcion = result.usuario.decripcion;
                        alumno.fotografia = "data:image/png;base64," + result.usuario.foto;
                        proyecto.alumnos.push(alumno);

                    } else if (result.usuario.role == 'Ingeniero') {
                      let catedratico: any = {};
                      catedratico.nombreCompleto = result.usuario.primer_nombre +' '+ result.usuario.segundo_nombre +' '+
                        result.usuario.primer_nombre +' '+ result.usuario.otros_nombre +' '+
                        result.usuario.primer_apellido +' '+ result.usuario.segundo_apellido;
                        catedratico.profesion = result.usuario.profesion;
                        catedratico.descripcion = result.usuario.decripcion;
                        catedratico.fotografia = "data:image/png;base64," + result.usuario.foto;
                        proyecto.catedraticos.push(catedratico);
                    }



                  }
                );

              });
            }
          );


        });
        console.log(this.proyectos);
      }
    )
  }

  openVotar(event: any, proyecto: any, panel: OverlayPanel) {
    this.panelVotar = panel;
    this.eventPanel = event;
    panel.toggle(event);
  }

  pushMessage(proyecto: any,) {
    console.log("call pushMessage:");
    this.proyectoService.enviarPush(proyecto.id).subscribe(
      result => {
        console.log(result);
      }
    );
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
