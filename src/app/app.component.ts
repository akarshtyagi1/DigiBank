import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'digibank-prototype';

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'ar']);
    translate.setDefaultLang('en');
  }

  switchLang(lang: string) {
    debugger;
    this.translate.setDefaultLang(lang);
  }
}
