import { Injectable ,Inject} from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
//import { THIS_EXPR } from '../../../node_modules/@angular/compiler/src/output/output_ast';
@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  


  constructor(private httpClient: HttpClient) { 
   
  }

  public getProyectos():Observable<any>{
    //const  params = new  HttpParams().set('tipo', "A");
    return this.httpClient.get<any>('https://udeo.herokuapp.com/proyectos.json')
    .pipe(retry(1),catchError(this.handleError))
  }

  public getGaleriaProyecto(idProyecto:any):Observable<any>{
    return this.httpClient.get<any>('https://udeo.herokuapp.com/proyectos/'+idProyecto+'/galeria.json')
    .pipe(retry(1),catchError(this.handleError))
  }

  public getIntegrantesProyecto(idProyecto:any):Observable<any>{ 
    return this.httpClient.get<any>('https://udeo.herokuapp.com/proyectos/'+idProyecto+'/integrantes.json')
    .pipe(retry(1),catchError(this.handleError))
  }

  public getCategoriasProyecto(idProyecto:any):Observable<any>{
    return this.httpClient.get<any>('https://udeo.herokuapp.com/proyectos/'+idProyecto+'/categorias.json')
    .pipe(retry(1),catchError(this.handleError))
  }

  public getCategoria(idCategoria:any):Observable<any>{
    return this.httpClient.get<any>('https://udeo.herokuapp.com/categorias/'+idCategoria+'.json')
    .pipe(retry(1),catchError(this.handleError))
  }

  public getUsuarioPorId(idUsuario:any):Observable<any>{
    return this.httpClient.get<any>('https://udeo.herokuapp.com/usuarios/'+idUsuario+'.json')
    .pipe(retry(1),catchError(this.handleError))
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }


}
