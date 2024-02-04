import { Component,OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { LoadingComponent } from './loading/loading.component';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [CarouselModule,LoadingComponent],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})

export class AboutusComponent implements OnInit {
  {
    isLoading: boolean = true;
    aboutData: any;
  
    constructor(private aboutUsService: AboutUsService) { }
  
    ngOnInit(): void {
      this.loadAboutUsData();
    }
  
    loadAboutUsData() {
      this.aboutUsService.getAboutUsData().subscribe(data => {
        this.aboutData = data;
        this.isLoading = false;
      });
    }
  }
}
