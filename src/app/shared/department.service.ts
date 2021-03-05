import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  departmentList: AngularFireList<any>;
  array = [];

  constructor(public firebase: AngularFireDatabase) { 
    this.departmentList = this.firebase.list('department');
    this.departmentList.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }
}
