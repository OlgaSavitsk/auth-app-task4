import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '@auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/modules/material/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;

  private ngUnsubscribe = new Subject();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next('');
    this.ngUnsubscribe.complete();
  }
}
