import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Member } from '../../services/api.service';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dashboard-container">
      <div class="card">
        <h2>Members Management</h2>
        
        <button (click)="openAddModal()" style="margin-bottom: 20px;">Add New Member</button>

        <table *ngIf="members.length">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Membership</th>
              <th>Start Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let member of members">
              <td>{{ member.name }}</td>
              <td>{{ member.email }}</td>
              <td>{{ member.phone }}</td>
              <td>{{ member.membership_type }}</td>
              <td>{{ member.start_date | date }}</td>
              <td>{{ member.status }}</td>
              <td>
                <button class="secondary" (click)="openEditModal(member)" style="margin-right: 5px;">Edit</button>
                <button class="danger" (click)="deleteMember(member.id!)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p *ngIf="!members.length">No members yet. Click "Add New Member" to get started.</p>
      </div>

      <!-- Modal -->
      <div class="modal" [ngClass]="{ show: showModal }">
        <div class="modal-content">
          <div class="modal-header">
            <h2>{{ editingMember ? 'Edit Member' : 'Add New Member' }}</h2>
            <button class="close" (click)="closeModal()">&times;</button>
          </div>
          <form (ngSubmit)="saveMember()">
            <div class="form-group">
              <label>Name *</label>
              <input type="text" [(ngModel)]="formData.name" name="name" required>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" [(ngModel)]="formData.email" name="email">
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input type="tel" [(ngModel)]="formData.phone" name="phone">
            </div>
            <div class="form-group">
              <label>Membership Type</label>
              <select [(ngModel)]="formData.membership_type" name="membership_type">
                <option value="">Select Type</option>
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="vip">VIP</option>
              </select>
            </div>
            <div class="form-group">
              <label>Start Date</label>
              <input type="date" [(ngModel)]="formData.start_date" name="start_date">
            </div>
            <div class="form-group">
              <label>Status</label>
              <select [(ngModel)]="formData.status" name="status">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 20px;">
              <button type="submit">{{ editingMember ? 'Update' : 'Create' }}</button>
              <button type="button" class="secondary" (click)="closeModal()">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MembersComponent implements OnInit {
  members: Member[] = [];
  showModal = false;
  editingMember: Member | null = null;
  formData: Member = this.initializeFormData();

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.apiService.getMembers().subscribe({
      next: (data) => this.members = data,
      error: (error) => console.error('Error loading members:', error)
    });
  }

  openAddModal() {
    this.editingMember = null;
    this.formData = this.initializeFormData();
    this.showModal = true;
  }

  openEditModal(member: Member) {
    this.editingMember = member;
    this.formData = { ...member };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingMember = null;
    this.formData = this.initializeFormData();
  }

  saveMember() {
    const operation = this.editingMember
      ? this.apiService.updateMember(this.editingMember.id!, this.formData)
      : this.apiService.createMember(this.formData);

    operation.subscribe({
      next: () => {
        this.loadMembers();
        this.closeModal();
      },
      error: (error) => console.error('Error saving member:', error)
    });
  }

  deleteMember(id: number) {
    if (confirm('Are you sure you want to delete this member?')) {
      this.apiService.deleteMember(id).subscribe({
        next: () => this.loadMembers(),
        error: (error) => console.error('Error deleting member:', error)
      });
    }
  }

  private initializeFormData(): Member {
    return {
      name: '',
      email: '',
      phone: '',
      membership_type: '',
      start_date: '',
      status: 'active'
    };
  }
}
