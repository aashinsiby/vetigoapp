import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { VisibleService } from '../visible.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,MatIcon,RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


}