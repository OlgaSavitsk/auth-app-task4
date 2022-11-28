import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

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
  isSpinner: boolean = false;

  private ngUnsubscribe = new Subject();
  private errorMessage$ = new BehaviorSubject<string>('');
  errorMessage$$ = this.errorMessage$.pipe();

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
    this.isSpinner = !this.isSpinner;
    this.authService.signUp(this.formGroup.value).subscribe(
      () => {
        this.formGroup.reset();
        this.isSpinner = false;
      },
      (err) => {
        this.errorMessage$.next(err.error.message);
      }
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next('');
    this.ngUnsubscribe.complete();
  }
}
