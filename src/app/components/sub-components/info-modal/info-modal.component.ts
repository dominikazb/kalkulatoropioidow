import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {CookieService} from 'ngx-cookie-service';
import infoModalContent from '../../shared/data/textContent/infoModalContent.json';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css']
})
export class InfoModalComponent implements OnInit {

  public textData: {
    title: string,
    text1: string,
    consent1: string,
    consent2a: string,
    consent2link: string,
    consent2b: string,
    consent2c: string,
    consent2d: string,
    subTitle1: string,
    text2: string,
    owner1: string,
    owner2: string,
    owner3: string,
    owner4: string,
    owner5: string,
    owner6: string,
    text3: string,
    subTitle2: string,
    text4: string,
    text5: string,
    text6: string,
    text7: string,
    text8: string,
    subTitle3: string,
    text9: string,
    subTitle4: string,
    text10: string,
    btnText: string
  } = infoModalContent;

  public infoModalForm: FormGroup;

  constructor(public modalRef: BsModalRef,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  public buildForm(): void {
    this.infoModalForm = new FormGroup({
      checkBox1: new FormControl(false, Validators.requiredTrue),
      checkBox2: new FormControl(false, Validators.requiredTrue)
    });
  }

  public onSubmit(): void {
    localStorage.setItem('modalWasOpen', 'true');
    this.modalRef.hide();
  }
}
