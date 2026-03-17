import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:4000/api';

export interface Member {
  id?: number;
  name: string;
  email?: string;
  phone?: string;
  membership_type?: string;
  start_date?: string;
  status?: string;
}

export interface Payment {
  id?: number;
  member_id: number;
  amount: number;
  date: string;
  payment_method?: string;
  status?: string;
}

export interface Expense {
  id?: number;
  category: string;
  amount: number;
  date: string;
  description?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Members
  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${API_URL}/members`);
  }

  getMember(id: number): Observable<Member> {
    return this.http.get<Member>(`${API_URL}/members/${id}`);
  }

  createMember(member: Member): Observable<Member> {
    return this.http.post<Member>(`${API_URL}/members`, member);
  }

  updateMember(id: number, member: Member): Observable<Member> {
    return this.http.put<Member>(`${API_URL}/members/${id}`, member);
  }

  deleteMember(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/members/${id}`);
  }

  // Payments
  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${API_URL}/payments`);
  }

  getPayment(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${API_URL}/payments/${id}`);
  }

  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${API_URL}/payments`, payment);
  }

  updatePayment(id: number, payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${API_URL}/payments/${id}`, payment);
  }

  deletePayment(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/payments/${id}`);
  }

  // Expenses
  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${API_URL}/expenses`);
  }

  getExpense(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${API_URL}/expenses/${id}`);
  }

  createExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${API_URL}/expenses`, expense);
  }

  updateExpense(id: number, expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${API_URL}/expenses/${id}`, expense);
  }

  deleteExpense(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/expenses/${id}`);
  }
}
