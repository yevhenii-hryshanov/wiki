import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor() { }

  private titleSource = new BehaviorSubject('');
  currentTitle = this.titleSource.asObservable();


  changeTitle(title: string) {
    this.titleSource.next(title)
  }
}
