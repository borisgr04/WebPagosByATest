import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/persona';
import { PersonaService } from '../../services/persona.service';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../../@base/alert-modal/alert-modal.component';
import { TerceroConsultaModalComponent } from '../../clientes/modals/tercero-consulta-modal/tercero-consulta-modal.component';
import { promise } from 'protractor';

@Component({
  selector: 'app-persona-registro-reactive',
  templateUrl: './persona-registro-reactive.component.html',
  styleUrls: ['./persona-registro-reactive.component.css']
})
export class PersonaRegistroReactiveComponent implements OnInit {

  persona: Persona;
  formGroup: FormGroup;
  submitted = false;

  constructor(
    private personaService: PersonaService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.persona = new Persona();
    this.persona.identificacion = '';
    this.persona.nombre = '';
    this.persona.edad = 0;
    this.persona.pulsacion = 0;
    this.persona.sexo = '';

    this.formGroup = this.formBuilder.group({
      identificacion: [this.persona.identificacion, Validators.required],
      nombre: [this.persona.nombre, Validators.required],
      sexo: [this.persona.sexo, [Validators.required, this.validaSexo]],
      edad: [this.persona.edad, [Validators.required, Validators.min(1)]]
    });
  }

  openModalCliente() {
    this.modalService.open(TerceroConsultaModalComponent, { size: 'lg' }).result.then((persona) => this.actualizar(persona));
  }

  actualizar(persona: Persona) {
    alert(JSON.stringify(persona));
    this.formGroup.controls['identificacion'].setValue(persona.identificacion);
    this.formGroup.controls['nombre'].setValue(persona.nombre);
  }
  /*
  buscarCliente() {
    this.personaService.getByIdentificacion(this.formGroup.value.identificacion).subscribe(persona => {
      if (persona != null) {
        this.f['identificacion'].setValue(persona.identificacion);
        this.f['nombre'].setValue(persona.nombreCompleto);
      }
      else {
        this.openModalCliente();
      }
    });
  }*/

  // convenience getter for easy access to form fields
  get f() { return this.formGroup.controls; }

  private validaSexo(control: AbstractControl) {
    const sexo = control.value;
    if (sexo.toLocaleUpperCase() !== 'M' && sexo.toLocaleUpperCase() !== 'F') {
      return {
        validSexo: true, messageSexo: 'Sexo no Valido' 	};
      }
      return null;
  }

  get control() {
    return this.formGroup.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formGroup.invalid) {
      return;
    }
    this.add();
  }

  add() {
    this.persona = this.formGroup.value;
    this.personaService.post(this.persona).subscribe(p => {
      if (p != null) {

        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Persona creada!!! :-)';

        this.persona = p;
      }
    });
  }

}
