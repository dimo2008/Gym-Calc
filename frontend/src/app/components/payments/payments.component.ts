import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Payment, Member } from '../../services/api.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dashboard-container">
      <div class="card">
        <h2>Payments Management</h2>
        
        <button (click)="openAddModal()" style="margin-bottom: 20px;">Add New Payment</button>

        <table *ngIf="payments.length">
          <thead>
            <tr>
              <th>Date</th>
              <th>Member ID</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let payment of payments">
              <td>{{ payment.date | date }}</td>
              <td>{{ payment.member_id }}</td>
              <td>{{ payment.amount | currency }}</td>
              <td>{{ payment.payment_method }}</td>
              <td>{{ payment.status }}</td>
              <td>
                <button class="secondary" (click)="openEditModal(payment)" style="margin-right: 5px;">Edit</button>
                <button class="danger" (click)="deletePayment(payment.id!)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p *ngIf="!payments.length">No payments yet.</p>
      </div>

      <!-- Modal -->
      <div class="modal" [ngClass]="{ show: showModal }">
        <div class="modal-content">
          <div class="modal-header">
            <h2>{{ editingPayment ? 'Edit Payment' : 'Add New Payment' }}</h2>
            <button class="close" (click)="closeModal()">&times;</button>
          </div>
          <form (ngSubmit)="savePayment()">
            <div class="form-group">
              <label>Member ID *</label>
              <input type="number" [(ngModel)]="formData.member_id" name="member_id" required>
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
              <label>Payment Method</label>
              <select [(ngModel)]="formData.payment_method" name="payment_method">
                <option value="">Select Method</option>
                <option value="cash">Cash</option>
                <option value="credit_card">Credit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="online">Online Payment</option>
              </select>
            </div>
            <div class="form-group">
              <label>Status</label>
              <select [(ngModel)]="formData.status" name="status">
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 20px;">
              <button type="submit">{{ editingPayment ? 'Update' : 'Create' }}</button>
              <button type="button" class="secondary" (click)="closeModal()">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];
  members: Member[] = [];
  showModal = false;
  editingPayment: Payment | null = null;
  formData: Payment = this.initializeFormData();

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadPayments();
    this.loadMembers();
  }

  loadPayments() {
    this.apiService.getPayments().subscribe({
      next: (data) => this.payments = data,
      error: (error) => console.error('Error loading payments:', error)
    });
  }

  loadMembers() {
    this.apiService.getMembers().subscribe({
      next: (data) => this.members = data,
      error: (error) => console.error('Error loading members:', error)
    });
  }

  openAddModal() {
    this.editingPayment = null;
    this.formData = this.initializeFormData();
    this.showModal = true;
  }

  openEditModal(payment: Payment) {
    this.editingPayment = payment;
    this.formData = { ...payment };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingPayment = null;
    this.formData = this.initializeFormData();
  }

  savePayment() {
    const operation = this.editingPayment
      ? this.apiService.updatePayment(this.editingPayment.id!, this.formData)
      : this.apiService.createPayment(this.formData);

    operation.subscribe({
      next: () => {
        this.loadPayments();
        this.closeModal();
      },
      error: (error) => console.error('Error saving payment:', error)
    });
  }

  deletePayment(id: number) {
    if (confirm('Are you sure you want to delete this payment?')) {
      this.apiService.deletePayment(id).subscribe({
        next: () => this.loadPayments(),
        error: (error) => console.error('Error deleting payment:', error)
      });
    }
  }

  private initializeFormData(): Payment {
    return {
      member_id: 0,
      amount: 0,
      date: '',
      payment_method: '',
      status: 'completed'
    };
  }
}
