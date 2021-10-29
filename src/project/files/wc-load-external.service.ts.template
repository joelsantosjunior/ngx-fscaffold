import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WcLoadExternalService {

  constructor() { }

  load(path: string) {
    const script = document.createElement('script');
    script.src = path;
    document.body.appendChild(script);
  }
}
