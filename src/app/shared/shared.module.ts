import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  exports: [MaterialModule, ReactiveFormsModule, FormsModule],
})
export class SharedModule {}
