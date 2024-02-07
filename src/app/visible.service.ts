import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VisibleService {
  private _isVisible = new BehaviorSubject<boolean>(true);
  isVisible$ = this._isVisible.asObservable();

  showHome() {
    this._isVisible.next(true);
  }

  hideHome() {
    this._isVisible.next(false);
  }
  constructor() { }
}
