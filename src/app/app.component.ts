import {Component, OnInit} from '@angular/core';
import {InfoModalComponent} from './components/sub-components/info-modal/info-modal.component';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  modalConfig: ModalOptions = {
    class: 'modal-xl',
    ignoreBackdropClick: true,
    keyboard: false
  };
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.openModal();
  }

  public openModal(): void {
    if (this.cookieService.get('modalWasOpen') !== 'true') {
      this.modalRef = this.modalService.show(InfoModalComponent, this.modalConfig);
    }
  }
}
