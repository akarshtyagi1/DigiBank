import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const Header = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  let cloneReq = req.clone({ headers: Header });
  return next(cloneReq);
};
