import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [MatButton,FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.css'
})
export class ForgetComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
}
