import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

interface Asignacion {
  codigo: string;
  descripcion: string;
  oficina: string;
  responsable: string;
}

@Component({
  selector: 'app-asignacion-page',
  imports: [ReactiveFormsModule],
  templateUrl: './asignacion-page.html',
  styleUrl: './asignacion-page.scss',
})
export class AsignacionPage {
  private readonly http = inject(HttpClient);
  protected readonly codigo = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(15), Validators.pattern(/\S/)],
  });
  protected readonly form = new FormGroup({ codigo: this.codigo });
  protected readonly asignacion = signal<Asignacion | null>(null);
  protected readonly buscando = signal(false);
  protected readonly error = signal<string | null>(null);

  protected buscar(): void {
    if (this.buscando()) return;
    this.asignacion.set(null);
    this.error.set(null);
    if (this.codigo.invalid) {
      this.codigo.markAsTouched();
      this.error.set('Escribe un código de activo de hasta 15 caracteres.');
      return;
    }
    const codigo = this.codigo.value.trim();
    this.codigo.setValue(codigo);
    this.buscando.set(true);
    this.http.get<Asignacion>(`/api/activos/${encodeURIComponent(codigo)}/asignacion`)
      .pipe(finalize(() => this.buscando.set(false)))
      .subscribe({
        next: asignacion => this.asignacion.set(asignacion),
        error: (error: HttpErrorResponse) => this.error.set(error.status === 404
          ? `Activo no encontrado: ${codigo}. Comprueba el código e intenta otra vez.`
          : 'No se pudo consultar el activo. Intenta otra vez en unos momentos.'),
      });
  }
}
