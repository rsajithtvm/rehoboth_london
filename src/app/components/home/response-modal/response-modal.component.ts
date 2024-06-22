// response-modal.component.ts
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-response-modal',
  templateUrl: './response-modal.component.html',
})
export class ResponseModalComponent {
  @Input() isSuccess: boolean = false;

  constructor(public activeModal: NgbActiveModal) {}

  close() {
    this.activeModal.close();
  }
}
