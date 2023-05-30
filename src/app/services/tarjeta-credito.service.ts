import { Injectable } from '@angular/core';
import { TarjetaCredito } from '../models/tarjeta.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaCreditoService {
  private tarjeta$ = new Subject<any>();

  setTarjeta(tarjeta:TarjetaCredito){
    this.tarjeta$.next(tarjeta);
  }

  getTarjeta():Observable<TarjetaCredito>{
    return this.tarjeta$.asObservable();
  }

  constructor(private firestore:AngularFirestore) { }

  guardarTarjeta(tarjeta:TarjetaCredito): Promise<any>{
    return this.firestore.collection('tarjetas').add(tarjeta);
  }

  obtenerTarjetas():Observable<any>{
    return this.firestore.collection('tarjetas', ref => ref.orderBy('fechaCreacion','asc')).snapshotChanges();
  }

  eliminar(id: string ): Promise<any>{
    return this.firestore.collection('tarjetas').doc(id).delete();
  }

  modificar(id: string, tarjeta:any): Promise<any>{
    return this.firestore.collection('tarjetas').doc(id).update(tarjeta);
  }
}
