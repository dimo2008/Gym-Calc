import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Member, Payment, Expense } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Total Members</div>
          <div class="stat-value">{{ totalMembers }}</div>
        </div>
        <div class="stat-card income">
          <div class="stat-label">Total Income</div>
          <div class="stat-value">{{ totalIncome | currency }}</div>
        </div>
        <div class="stat-card expense">
          <div class="stat-label">Total Expenses</div>
          <div class="stat-value">{{ totalExpenses | currency }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Net Profit</div>
          <div class="stat-value">{{ netProfit | currency }}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div class="card">
          <h2>Recent Payments</h2>
          <table *ngIf="recentPayments.length">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let payment of recentPayments.slice(0, 5)">
                <td>{{ payment.date | date }}</td>
                <td>{{ payment.amount | currency }}</td>
                <td>{{ payment.status }}</td>
              </tr>
            </tbody>
          </table>
          <p *ngIf="!recentPayments.length">No payments yet</p>
        </div>

        <div class="card">
          <h2>Recent Expenses</h2>
          <table *ngIf="recentExpenses.length">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let expense of recentExpenses.slice(0, 5)">
                <td>{{ expense.date | date }}</td>
                <td>{{ expense.category }}</td>
                <td>{{ expense.amount | currency }}</td>
              </tr>
            </tbody>
          </table>
          <p *ngIf="!recentExpenses.length">No expenses yet</p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  totalMembers = 0;
  totalIncome = 0;
  totalExpenses = 0;
  netProfit = 0;
  recentPayments: Payment[] = [];
  recentExpenses: Expense[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.apiService.getMembers().subscribe({
      next: (members: Member[]) => {
        this.totalMembers = members.length;
      },
      error: (error) => console.error('Error loading members:', error)
    });

    this.apiService.getPayments().subscribe({
      next: (payments: Payment[]) => {
        this.totalIncome = payments.reduce((sum, p) => sum + p.amount, 0);
        this.recentPayments = payments;
        this.calculateNetProfit();
      },
      error: (error) => console.error('Error loading payments:', error)
    });

    this.apiService.getExpenses().subscribe({
      next: (expenses: Expense[]) => {
        this.totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
        this.recentExpenses = expenses;
        this.calculateNetProfit();
      },
      error: (error) => console.error('Error loading expenses:', error)
    });
  }

  calculateNetProfit() {
    this.netProfit = this.totalIncome - this.totalExpenses;
  }
}
