import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { FileUpload } from '../model/file';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { XmlViewService } from '../services/xml-view.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModal } from '../modals/confirm-modal/confirm-modal';

@Component({
	selector: 'vex-xml-view',
	templateUrl: './xml-view.component.html',
	styleUrls: ['./xml-view.component.scss'],
	animations: [
		fadeInUp400ms,
		stagger20ms
	]
})
export class XmlViewComponent implements OnInit {

	// files: FileUpload[] = []
	listFilesToSent: any = [];
	dataSource = new MatTableDataSource<any>()
	displayedColumns: string[] = ['select', 'name', 'size', 'status'];
	selection = new SelectionModel<FileUpload>(true, []);

	constructor(private _snackBar: MatSnackBar, private xmlViewService: XmlViewService, public dialog: MatDialog) { }

	ngOnInit(): void {
	}

	uploadFile(event) {
		
		for (let index = 0; index < event.length; index++) {
			const element = event[index];

			let idxDot = element.name.lastIndexOf(".") + 1;
			let extFile = element.name.substr(idxDot, element.name.length).toLowerCase();
			if (extFile=="xml"){
				var fileElement = <any>event[index]
				// let file: FileUpload = new FileUpload(this.listFilesToSent.length +1, element.name, element.size, "Carregado");
				let exist = this.listFilesToSent.find(f => f.name == fileElement.name)

				if (!exist) {
					fileElement.id = this.listFilesToSent.length +1;
					fileElement.status = "Carregado";
					this.listFilesToSent.push(fileElement);
				} else {
					this._snackBar.open("Arquivo já adicionado", 'Fechar', { duration: 3000 })
				}
			}else{
				this._snackBar.open("Formato de arquivo inválido", 'Fechar', { duration: 3000 })
			} 
		}
		this.dataSource = new MatTableDataSource<any>(this.listFilesToSent)
		
         
	}


	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	toggleAllRows() {
		if (this.isAllSelected()) {
			this.selection.clear();
			return;
		}

		this.selection.select(...this.dataSource.data);
	}

	checkboxLabel(row?: FileUpload): string {
		if (!row) {
			return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
	}

	openDeleteModal() {
		const dialogRef = this.dialog.open(ConfirmModal, {
			data: this.selection.selected
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.deleteFiles();
			}
		});
	}

	deleteFiles() {
		this.selection.selected.forEach(file=>{
			this.removeElementFromArray(file);
		})

		this.selection.clear();
		this.dataSource = new MatTableDataSource<any>(this.listFilesToSent)
	}

	removeElementFromArray(element: any) {
		this.listFilesToSent.forEach((value,index)=>{
			if(value==element) this.listFilesToSent.splice(index,1);
		});

	}

	sendFiles() {
		console.log("listFilesToSent");
		
		console.log(this.listFilesToSent);
		
		this.listFilesToSent.forEach(file => {
			file.status = "Enviando";
			let formData: FormData = new FormData();
			formData.append('file', file, file.name);

			// Timer usado para mostrar melhor o load já que a Api executa muito rápido
			setTimeout(() => {
				this.xmlViewService.sendFiles(formData).subscribe(() => {
					file.status = "Enviado";
				}, (error) => {
					console.log(error);
				})
			}, 2000);
		})
	}
}
