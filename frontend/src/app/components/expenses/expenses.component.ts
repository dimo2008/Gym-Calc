import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Expense } from '../../services/api.service';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dashboard-container">
      <div class="card">
        <h2>Expenses Management</h2>
        
        <button (click)="openAddModal()" style="margin-bottom: 20px;">Add New Expense</button>

        <table *ngIf="expenses.length">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let expense of expenses">
              <td>{{ expense.date | date }}</td>
              <td>{{ expense.category }}</td>
              <td>{{ expense.amount | currency }}</td>
              <td>{{ expense.description }}</td>
              <td>{{ expense.status }}</td>
              <td>
                <button class="secondary" (click)="openEditModal(expense)" style="margin-right: 5px;">Edit</button>
                <button class="danger" (click)="deleteExpense(expense.id!)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p *ngIf="!expenses.length">No expenses yet.</p>
      </div>

      <!-- Modal -->
      <div class="modal" [ngClass]="{ show: showModal }">
        <div class="modal-content">
          <div class="modal-header">
            <h2>{{ editingExpense ? 'Edit Expense' : 'Add New Expense' }}</h2>
            <button class="close" (click)="closeModal()">&times;</button>
          </div>
          <form (ngSubmit)="saveExpense()">
            <div class="form-group">
              <label>Category *</label>
              <select [(ngModel)]="formData.category" name="category" required>
                <option value="">Select Category</option>
                <option value="utilities">Utilities</option>
                <option value="maintenance">Maintenance</option>
                <option value="salary">Salary</option>
                <option value="equipment">Equipment</option>
                <option value="rent">Rent</option>
                <option value="supplies">Supplies</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label>Amount *</label>
              <input type="number" [(ngModel)]="formData.amount" name="amount" step="0.01" required>
            </div>
            <div class="form-group">
              <label>Date *</label>
              <input type="date" [(ngModel)]="formData.date" name="date" required>
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea [(ngModel)]="formData.description" name="description" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>Status</label>
              <select [(ngModel)]="formData.status" name="status">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 20px;">
              <button type="submit">{{ editingExpense ? 'Update' : 'Create' }}</button>
              <button type="button" class="secondary" (click)="closeModal()">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ExpensesComponent implements OnInit {
  expenses: Expense[] = [];
  showModal = false;
  editingExpense: Expense | null = null;
  formData: Expense = this.initializeFormData();

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadExpenses();
  }

  loadExpenses() {
    this.apiService.getExpenses().subscribe({
      next: (data) => this.expenses = data,
      error: (error) => console.error('Error loading expenses:', error)
    });
  }

  openAddModal() {
    this.editingExpense = null;
    this.formData = this.initializeFormData();
    this.showModal = true;
  }

  openEditModal(expense: Expense) {
    this.editingExpense = expense;
    this.formData = { ...expense };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingExpense = null;
    this.formData = this.initializeFormData();
  }

  saveExpense() {
    const operation = this.editingExpense
      ? this.apiService.updateExpense(this.editingExpense.id!, this.formData)
      : this.apiService.createExpense(this.formData);

    operation.subscribe({
      next: () => {
        this.loadExpenses();
        this.closeModal();
      },
      error: (error) => console.error('Error saving expense:', error)
    });
  }

  deleteExpense(id: number) {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.apiService.deleteExpense(id).subscribe({
        next: () => this.loadExpenses(),
        error: (error) => console.error('Error deleting expense:', error)
      });
    }
  }

  private initializeFormData(): Expense {
    return {
      category: '',
      amount: 0,
      date: '',
      description: '',
      status: 'pending'
    };
  }
}
