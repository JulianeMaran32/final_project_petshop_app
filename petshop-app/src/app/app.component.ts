import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layouts/main-layout/header/header.component";
import { FooterComponent } from "./layouts/main-layout/footer/footer.component";
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [PrimeNGConfig, TranslateService]
})
export class AppComponent implements OnInit{
  title = 'petshop-app';

  constructor(
    private primeNgConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primeNgConfig.ripple = true;
  }

}
