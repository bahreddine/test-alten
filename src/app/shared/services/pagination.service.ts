import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PaginationService {
  currentPage = signal(1);
  itemsPerPage = 10;

  setPage(page: number) {
    this.currentPage.set(Math.max(1, page));
  }

  previousPage() {
    this.currentPage.update(current => Math.max(1, current - 1));
  }

  nextPage(totalPages: number) {
    this.currentPage.update(current => Math.min(totalPages, current + 1));
  }
}
