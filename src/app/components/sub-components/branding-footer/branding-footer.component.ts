import {Component, Input} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'branding-footer',
  templateUrl: './branding-footer.component.html'
})
export class BrandingFooterComponent {
  @Input() showBrandingFooterText: boolean;
}
