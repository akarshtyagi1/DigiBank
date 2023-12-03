import { Injectable } from '@angular/core';
import { MasterService } from '../master/master.service';
import { APIConstant } from '../../constant/APIConstant';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private master: MasterService) {}

  getUsers() {
    this.master
      .get(environment.api + APIConstant.user.getAllUsers)
      .subscribe((data) => console.log(data));
  }
}
