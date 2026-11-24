import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly session = this.auth.session;
  protected readonly sidebarOpen = signal(false);
  protected readonly headerBackground = "url('assets/images/barravsiaf.jpg')";
  protected readonly background = "url('assets/images/themes/1.PNG')";

  protected toggleSidebar(): void {
    this.sidebarOpen.update(open => !open);
  }

  protected logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
