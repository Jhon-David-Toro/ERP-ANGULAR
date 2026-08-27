import { Injectable } from '@angular/core';
import { v7 as uuidv7 } from 'uuid';

import {
  User,
  PublicUser,
  // UserRole,
  LoginDTO,
  RegisterDTO
} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  private currentUserId: string | null = null;

  async createUser(userData: RegisterDTO): Promise<PublicUser> {
    const now = new Date().toISOString();
    const newUser: User = {
      id: uuidv7(),
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      role: 'seller',
      country: userData.country,
      phone_number: userData.phone_number,
      password: userData.password,
      is_active: true,
      created_at: now,
      updated_at: now
    };

    this.users.push(newUser);

    const { password: _password, ...publicUser } = newUser;
    void _password;

    return publicUser;
  }

  async login(credentials: LoginDTO): Promise<PublicUser | null> {
    const foundUser = this.users.find(
      (candidateUser) =>
        candidateUser.email === credentials.email && candidateUser.password === credentials.password
    );

    if (!foundUser) {
      return null;
    }

    this.setCurrentUser(foundUser.id);

    const { password: _password, ...publicUser } = foundUser;
    void _password;

    return publicUser;
  }

  async getUsers(): Promise<User[]> {
    return [...this.users];
  }

  setCurrentUser(userId: string): void {
    this.currentUserId = userId;
  }

  async getCurrentUserProfile(): Promise<PublicUser | null> {
    if (!this.currentUserId) {
      return null;
    }

    return this.getUserById(this.currentUserId);
  }

  async getUserById(userId: string): Promise<PublicUser | null> {
    const foundUser = this.users.find((user) => user.id === userId);

    if (!foundUser) {
      return null;
    }

    const { password: _password, ...publicUser } = foundUser;
    void _password;

    return publicUser;
  }

  hasCurrentUser(): boolean {
    return this.currentUserId !== null && this.users.some((user) => user.id === this.currentUserId);
  }
}
