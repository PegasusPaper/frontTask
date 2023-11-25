import { CanActivateFn, CanMatchFn } from '@angular/router';
import { readLocalStorage } from '../helpers/utils';

export const authGuard: CanActivateFn = (route, state) => {
  let status: boolean = true;
  let token: any = readLocalStorage('token');

  if (!token || token == undefined) {
    status = false;
  }

  return status;
};
