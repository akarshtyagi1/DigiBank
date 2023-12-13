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

  isLoggedIn: boolean = sessionStorage.getItem('isAuthenticated') === 'true';

  authenticate(credentials: Login): Observable<User> {
    return this.getAllUsers().pipe(
      map((users: User[]) => {
        const authenticatedUser: User | undefined = users.find(
          (user) =>
            user.customerId === credentials.customerId &&
            user.password === credentials.password
        );
        if (authenticatedUser) {
          this.isLoggedIn = true;
          sessionStorage.setItem(
            'authenticatedUser',
            JSON.stringify(authenticatedUser)
          );
          sessionStorage.setItem('isAuthenticated', 'true');
          return authenticatedUser;
        } else {
          throw new Error('Invalid Credentials');
        }
      })
    );
  }

  logout() {
    sessionStorage.setItem('isAuthenticated', 'false');
    sessionStorage.removeItem('authenticatedUser');
  }

  getAllUsers(): Observable<User[]> {
    return this.master.get(environment.api + APIConstant.user.getAllUsers);
  }

  getAuthenticatedUser(): Observable<User> | undefined {
    const userString = sessionStorage.getItem('authenticatedUser');
    if (userString) {
      const user: User = JSON.parse(userString);
      return this.master.get(
        environment.api + APIConstant.user.getAllUsers + '/' + user.id
      );
    } else {
      return undefined;
    }
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('isAuthenticated') === 'true';
  }
}
