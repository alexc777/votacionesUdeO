import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { VotoInterface } from '../models/voto';
@Injectable({
    providedIn: "root"
})
export class GraficasService {
    votosCollection: AngularFirestoreCollection<any>;
    votos: Observable<any>;
    user: string;
    constructor(private afs: AngularFirestore, private authservice: AuthService) {
        this.user = authservice.returnUser();
        console.log(this.user);
        console.log(authservice.returnUID());
        
    }

    getVotosGenerales() {
        return this.afs.collection<any>('voto').valueChanges();
    }

       
}
