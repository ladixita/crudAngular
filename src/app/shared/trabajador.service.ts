import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {

  constructor(public firebase: AngularFireDatabase, private datePipe: DatePipe) { }

  trabajadorList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    telefono: new FormControl('', [Validators.required, Validators.minLength(9)]),
    ciudad: new FormControl(''),
    genero: new FormControl('1'),
    department: new FormControl(0),
    fecha: new FormControl(''),
    estado: new FormControl(false)
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      nombre: '',
      email: '',
      telefono: '',
      ciudad: '',
      genero: '1',
      department: 0,
      fecha: '',
      estado: false
    });
  }

  getTrabajadores(){
    this.trabajadorList = this.firebase.list('trabajadores');
    return this.trabajadorList.snapshotChanges();
  }

  insertTrabajador(trabajador){
    this.trabajadorList.push({
      nombre: trabajador.nombre,
      email: trabajador.email,
      telefono: trabajador.telefono,
      ciudad: trabajador.ciudad,
      genero: trabajador.genero,
      department: trabajador.department,
      fecha: this.datePipe.transform(trabajador.fecha, 'dd-MM-yyyy'),
      estado: trabajador.estado
    });
  }

  updateTrabajador(trabajador){
    this.trabajadorList.update(trabajador.$key,
      {
        nombre: trabajador.nombre,
        email: trabajador.email,
        telefono: trabajador.telefono,
        ciudad: trabajador.ciudad,
        genero: trabajador.genero,
        department: trabajador.department,
        fecha: this.datePipe.transform(trabajador.fecha, 'dd-MM-yyyy'),
        estado: trabajador.estado
      });
  }

  deleteTrabajador($key: string){
    this.trabajadorList.remove($key);
  }

  populateForm(trabajador){
    this.form.setValue(trabajador);
  }
}
