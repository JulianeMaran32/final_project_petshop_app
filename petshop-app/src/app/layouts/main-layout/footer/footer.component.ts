import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [TranslateService]
})
export class FooterComponent {

  translationKey = {
    privacyPolicy: 'FOOTER.privacyPolicy',
    termsOfUse: 'FOOTER.termsOfUse',
    contactUs: 'FOOTER.contactUs',
    copy: 'FOOTER.copy'
  }

  currentYear: number;

  constructor(private translate: TranslateService) {
    this.currentYear = new Date().getFullYear();
  }

}
