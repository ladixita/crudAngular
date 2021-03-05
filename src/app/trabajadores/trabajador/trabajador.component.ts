import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from  '@angular/material/dialog';

import { TrabajadorService } from '../../shared/trabajador.service';
import { DepartmentService } from '../../shared/department.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css']
})
export class TrabajadorComponent implements OnInit {

  constructor(public service: TrabajadorService,
    public departmentService: DepartmentService,
    private notificationService: NotificationService,
    public dialogref: MatDialogRef<TrabajadorComponent>) { }

  ngOnInit(): void {
    this.service.getTrabajadores();
  }

  limpiar(): void {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(){
    if(this.service.form.valid){
      if(!this.service.form.get('$key').value)
        this.service.insertTrabajador(this.service.form.value);
      else
      this.service.updateTrabajador(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Registro exitoso');
      this.onClose();
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogref.close();
  }
}
