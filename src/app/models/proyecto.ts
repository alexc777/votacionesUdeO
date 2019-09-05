import {Fotografia} from './fotografia';
export class Proyecto{
  public id:string;
  public nombre:string;
  public descripcion: string;
  public galeria:Array<Fotografia>;
  public galeriaFinal:Array<any>;
  public categorias:Array<any>;  
  public catedraticos:Array<any>;
  public alumnos:Array<any>;
    
  constructor(){
       this.id = null;
       this.nombre = null;
       this.descripcion = null;
       this.galeria = [];
       this.galeriaFinal = [];
       this.categorias = [];
       this.alumnos = [];
       this.catedraticos = [];
     
    }

}