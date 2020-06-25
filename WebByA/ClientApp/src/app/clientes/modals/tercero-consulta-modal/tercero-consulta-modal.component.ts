import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from '../../../pulsacion/models/persona';

@Component({
  selector: 'app-tercero-consulta-modal',
  templateUrl: './tercero-consulta-modal.component.html'
})
export class TerceroConsultaModalComponent {

  constructor(public activeModal: NgbActiveModal) { }

  actualizar(persona: Persona) {
    this.activeModal.close(persona);
  }
}
