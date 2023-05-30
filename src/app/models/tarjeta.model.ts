export class TarjetaCredito{
    id?:string;
    titular:string;
    numeroTarjeta:number;
    fechaExpiracion:string;
    cvv: string;
    fechaCreacion:Date;
    fechaActualizacion:Date;

    constructor(titular:string,numeroTarjeta:number,fechaExpiracion:string,cvv: string){
        this.titular = titular;
        this.numeroTarjeta = numeroTarjeta;
        this.fechaExpiracion = fechaExpiracion;
        this.cvv = cvv;
        this.fechaCreacion = new Date();
        this.fechaActualizacion = new Date();
    }
}