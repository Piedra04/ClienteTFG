import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private appComponent: AppComponent) { }

  onRegister(): void {
    console.log('onRegister');
    
  }

  onChange(): void {
    this.appComponent.isLogging = true;
  }
}
