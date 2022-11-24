import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { MaterialModule } from '@shared/modules/material/material.module';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;

  private ngUnsubscribe = new Subject();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      login: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
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
