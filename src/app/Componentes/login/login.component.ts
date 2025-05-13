import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private appComponent: AppComponent) { }


  onLogin(): void {
    console.log('onLogin');
  }

  onChange(): void {
    this.appComponent.isLogging = false;
  }
}
