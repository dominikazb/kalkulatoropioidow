import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ContentService} from '../../shared/services/content/content.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css']
})
export class InfoModalComponent implements OnInit {

  public infoModalForm: FormGroup;
  // TODO: do modala trzeba dodać treść o zapisywaniu wyniku wyszukiwania w bazie danych

  constructor(public contentService: ContentService,
              public modalRef: BsModalRef) {}

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
