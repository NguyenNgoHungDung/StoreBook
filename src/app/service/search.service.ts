import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchSubject = new BehaviorSubject<string>('');
  public searchResult$ = this.searchSubject.asObservable();

  constructor() {}

  setSearchTerm(term: string) {
    this.searchSubject.next(term);
  }
  getSearchResults() {
    return this.searchSubject.asObservable();
  }
}
