import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger60ms } from "src/@vex/animations/stagger.animation";

@Component({
	selector: 'confirm-modal',
	templateUrl: 'confirm-modal.html',
	animations: [
		stagger60ms,
		fadeInUp400ms
	]

})
export class ConfirmModal implements OnInit {
	ngOnInit(): void {
	}
	constructor() { }
}
