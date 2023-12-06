import { Injectable } from '@angular/core';
import { Login } from '../../models/Interface/login';
import { MasterService } from '../master/master.service';
import { User } from '../../models/class/user';
import { environment } from '../../../../environments/environment.development';
import { APIConstant } from '../../constant/APIConstant';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private master: MasterService) {}
  private authenticated: boolean = false;
  private user: User | null = null;

  authenticate(credentials: Login): Observable<User> {
    return this.getAllUsers().pipe(
      map((users: User[]) => {
        const authenticatedUser = users.find(
          (user) =>
            user.customerId === credentials.customerId &&
            user.password === credentials.password
        );
        console.log(authenticatedUser);
        if (authenticatedUser) {
          this.authenticated = true;
          this.user = authenticatedUser;
          return authenticatedUser;
        } else {
          throw new Error('Invalid User');
        }
      })
    );
  }

  logout() {
    this.authenticated = false;
    this.user = null;
  }
  getAllUsers(): Observable<User[]> {
    return this.master.get(environment.api + APIConstant.user.getAllUsers);
  }

  getAuthenticatedUser(): User | null {
    return this.user;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}
