import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/tarjeta.model';
import { TarjetaCreditoService } from 'src/app/services/tarjeta-credito.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  tarjetas:TarjetaCredito[] = [];
  
  constructor(private _tarjetasService: TarjetaCreditoService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.cargarListado()
  }

  cargarListado(){
    this._tarjetasService.obtenerTarjetas().subscribe(data => {
      this.tarjetas = [];
      data.forEach((element: any) => {
        this.tarjetas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()})
      });
    });
  }

  eliminar(id : any){
    this._tarjetasService.eliminar(id).then(() => {
    }, error => console.log(error));
  }

  modificar(tarjeta:TarjetaCredito){
    this._tarjetasService.setTarjeta(tarjeta);
  }
}
