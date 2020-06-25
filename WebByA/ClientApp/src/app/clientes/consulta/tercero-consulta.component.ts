import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { TerceroViewModel } from '../models/tercero-view-model';
import { Persona } from '../../pulsacion/models/persona';

@Component({
  selector: 'app-tercero-consulta',
  templateUrl: './tercero-consulta.component.html'
})
export class TerceroConsultaComponent implements OnInit {
  personas: Persona[];
  searchText: string;
  @Output() seleccionado = new EventEmitter<Persona>();

  constructor(private personaService: PersonaService) { }

  ngOnInit() {

    this.personaService.get().subscribe(result => {
      this.personas = result;
      this.searchText = '';
    });

    
  }

  seleccionar(persona: Persona) {
    this.seleccionado.emit(persona);
  }
}
