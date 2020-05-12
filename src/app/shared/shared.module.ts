import { NgModule } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { MaterialModule } from './material.module';
import { UploadDatePipe } from '@app/shared/upload-date.pipe';
import { FileNamePipe, FileStatusPipe } from './file-name.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    UploadDatePipe,
    FileNamePipe,
    FileStatusPipe,
    ClickOutsideDirective
  ],

  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    BreadcrumbsComponent,
    UploadDatePipe,
    FileNamePipe,
    FileStatusPipe,
    ClickOutsideDirective,
    ChartsModule
  ],

  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ChartsModule,
    RouterModule, // For routing directives
  ],
  providers: [KeyValuePipe]

})
export class SharedModule { }
