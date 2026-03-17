import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="app-wrapper">
      <nav class="sidebar">
        <div class="logo">Gym Calc</div>
        <ul class="nav-menu">
          <li><a routerLink="/dashboard" routerLinkActive="active">Dashboard</a></li>
          <li><a routerLink="/members" routerLinkActive="active">Members</a></li>
          <li><a routerLink="/payments" routerLinkActive="active">Payments</a></li>
          <li><a routerLink="/expenses" routerLinkActive="active">Expenses</a></li>
        </ul>
      </nav>
      <div class="main-content">
        <header class="header">
          <h1>Gym Calc Dashboard</h1>
        </header>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .app-wrapper {
      display: flex;
      height: 100vh;
    }

    .sidebar {
      width: 250px;
      background-color: #2c3e50;
      color: white;
      padding: 20px;
      overflow-y: auto;
    }

    .logo {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 30px;
      color: #667eea;
    }

    .nav-menu {
      list-style: none;
    }

    .nav-menu li {
      margin-bottom: 10px;
    }

    .nav-menu a {
      color: #ecf0f1;
      text-decoration: none;
      display: block;
      padding: 12px;
      border-radius: 4px;
      transition: all 0.3s;
    }

    .nav-menu a:hover,
    .nav-menu a.active {
      background-color: #667eea;
      color: white;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .header {
      background-color: white;
      padding: 20px;
      border-bottom: 1px solid #ddd;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .header h1 {
      margin: 0;
      color: #2c3e50;
    }

    @media (max-width: 768px) {
      .app-wrapper {
        flex-direction: column;
      }

      .sidebar {
        width: 100%;
      }

      .nav-menu {
        display: flex;
        gap: 10px;
      }

      .nav-menu li {
        margin: 0;
        flex: 1;
      }

      .nav-menu a {
        text-align: center;
      }
    }
  `]
})
export class AppComponent {}
