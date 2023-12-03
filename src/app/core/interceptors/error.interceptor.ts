import { HttpInterceptorFn } from '@angular/common/http';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // for handling response for the request, like checking for errors in one place
  return next(req);
};
