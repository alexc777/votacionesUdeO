import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { VotoInterface } from '../models/voto';
@Injectable({
    providedIn: "root"
})
export class VotosService {
    votosCollection: AngularFirestoreCollection<any>;
    votos: Observable<any>;
    user: string;
    constructor(public afs: AngularFirestore, private authservice: AuthService) {
        this.user = authservice.returnUser();
        this.votosCollection = afs.collection<any>('voto', ref => ref.where('usuario', '==', this.user.toString()));
    }

    getVotos() {
        return this.votos  = this.votosCollection.snapshotChanges().pipe(
            map(actions => actions.map(
                a => {
                    const data = a.payload.doc.data() as VotoInterface;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                }
            )));;
    }

    addVoto(voto: any) {
        this.votosCollection.add(voto);
    }
}
