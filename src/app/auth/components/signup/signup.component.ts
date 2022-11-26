import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ValidationService } from '@core/services/validation.service';
import { MaterialModule } from '@shared/modules/material/material.module';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;

  private ngUnsubscribe = new Subject();

  constructor(private authService: AuthService, public validationService: ValidationService) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
    this.formGroup.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.validationService.setValidationErrors(this.formGroup);
    });
  }

  onSubmit(): void {
    this.authService.signUp(this.formGroup.value).subscribe(() => {
      this.formGroup.reset();
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next('');
    this.ngUnsubscribe.complete();
  }
}
