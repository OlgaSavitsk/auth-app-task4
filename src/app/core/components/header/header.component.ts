import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MaterialModule } from '@shared/modules/material/material.module';
import { defaultUserName } from 'src/app/app.constants';
import LoginComponent from './login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LoginComponent, MaterialModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent {
  username: string | undefined = defaultUserName;

  constructor() {}
}
