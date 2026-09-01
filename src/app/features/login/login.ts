import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Input } from "../../shared/components/input/input";

@Component({
  imports: [CommonModule, Input], 
  styleUrl: './login.scss',
  templateUrl: './login.html'
})
export class Login {
  
  showPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}