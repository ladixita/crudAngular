import { Component, OnInit, ViewChild } from '@angular/core';
import { TrabajadorService } from '../../shared/trabajador.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { TrabajadorComponent } from '../trabajador/trabajador.component';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-trabajador-list',
  templateUrl: './trabajador-list.component.html',
  styleUrls: ['./trabajador-list.component.css']
})
export class TrabajadorListComponent implements OnInit {

  constructor(private service: TrabajadorService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['nombre', 'email', 'telefono', 'ciudad', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchkey: string;

  ngOnInit(): void {
    this.service.getTrabajadores().subscribe(
      list => {
        let array = list.map(item => {
          return{
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
           return this.displayedColumns.some(ele => {
             return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
           });
        };
      });
  }

  onSearchClear(){
    this.searchkey = "";
    this.applyfilter();
  }

  applyfilter(){
    this.listData.filter = this.searchkey.trim().toLowerCase();
  }

  onCreate(){
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(TrabajadorComponent, dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(TrabajadorComponent, dialogConfig);
  }

  onDelete($key){
    if(confirm('Estas seguro de que quieres eliminar?')){
      this.service.deleteTrabajador($key);
      this.notificationService.warn('! Borrado satisfactorio');
    }
  }
}
