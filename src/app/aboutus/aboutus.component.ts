import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})

export class AboutusComponent implements OnInit {
  isLoading: boolean = true;

  constructor() { }

  ngOnInit(): void {
    // Simulate loading delay (you can replace this with your actual loading logic)
    setTimeout(() => {
      this.isLoading = false; // Set isLoading to false after the delay
    }, 1500); // Change the delay time as needed
  } 
}
