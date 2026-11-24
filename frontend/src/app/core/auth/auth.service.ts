import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Session } from '@core/models/session.model';

export interface LoginRequest {
  username: string;
  password: string;
}

const demoSession: Session = {
  usuario: 'admin',
  backups: 'None',
  entidad: { codigo: '143', nombre: 'Universidad Autónoma Tomás Frías' },
  unidad: { codigo: 'SIS', nombre: 'CARRERA DE INGENIERIA DE SISTEMAS' },
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _session = signal<Session | null>(
    sessionStorage.getItem('vsiaf-demo') === 'admin' ? demoSession : null,
  );

  readonly session = this._session.asReadonly();
  readonly isAuthenticated = computed(() => this._session() !== null);

  login(credentials: LoginRequest): Observable<void> {
    if (credentials.username !== 'admin' || credentials.password !== 'admin') {
      return throwError(() => new HttpErrorResponse({ status: 401 }));
    }
    sessionStorage.setItem('vsiaf-demo', 'admin');
    this._session.set(demoSession);
    return of(undefined);
  }

  logout(): void {
    sessionStorage.removeItem('vsiaf-demo');
    this._session.set(null);
  }
}
