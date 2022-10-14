import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { XmlViewComponent } from './xml-view/xml-view.component';
import { ScrollbarModule } from 'src/@vex/components/scrollbar/scrollbar.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ConfirmModal } from './modals/confirm-modal/confirm-modal';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
	declarations: [AppComponent, XmlViewComponent, ConfirmModal],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MatTableModule,
		MatIconModule,
		MatTooltipModule,
		MatSnackBarModule,
		MatCheckboxModule,
		MatDialogModule,
		MatButtonModule,
		MatProgressSpinnerModule,

		// Vex
		VexModule,
		ScrollbarModule,
		CustomLayoutModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
