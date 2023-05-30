import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/tarjeta.model';
import { TarjetaCreditoService } from 'src/app/services/tarjeta-credito.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  form: FormGroup;
  loanding = false;
  titulo = "AGREGAR TARJETA";
  id: string | undefined;

  constructor(private fb: FormBuilder, private _servicioTarjeta:TarjetaCreditoService,
              private toastr: ToastrService) { 
    this.form = this.fb.group({
      titular: ['',Validators.required],
      numeroTarjeta: ['',[Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      fechaExpiracion: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    })
  }

  ngOnInit(): void {
    this._servicioTarjeta.getTarjeta().subscribe(data => {
      this.id = data.id;
      this.titulo = "EDITAR TARJETA";
      this.form.patchValue({
        titular: data.titular,
        numeroTarjeta: data.numeroTarjeta,
        fechaExpiracion: data.fechaExpiracion,
        cvv: data.cvv
      })
    })
  }

  crearTarjeta(){
    this.loanding = true;

    if (this.id == undefined){
      const Tarjeta : TarjetaCredito = {
        titular: this.form.value.titular,
        numeroTarjeta: this.form.value.numeroTarjeta,
        fechaExpiracion: this.form.value.fechaExpiracion,
        cvv: this.form.value.cvv,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      }

      this._servicioTarjeta.guardarTarjeta(Tarjeta).then(() => {
        this.form.reset();
        this.loanding = false;
      }, error => {
        this.toastr.error("Opps...",error);
        this.loanding = false;
      });
    }
    else {
      const Tarjeta : any = {
        titular: this.form.value.titular,
        numeroTarjeta: this.form.value.numeroTarjeta,
        fechaExpiracion: this.form.value.fechaExpiracion,
        cvv: this.form.value.cvv,
        fechaActualizacion: new Date()
      }
      
      this._servicioTarjeta.modificar(this.id,Tarjeta).then(() => {
        this.form.reset();
        this.loanding = false;
        this.titulo = "AGREGAR TARJETA";
        this.id = undefined;
      }, error => console.log(error))
    }
  }
}
