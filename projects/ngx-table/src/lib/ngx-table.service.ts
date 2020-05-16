import { Injectable } from '@angular/core';
import { MapOf, Pages } from './ngx-table.model';

@Injectable({
  providedIn: 'root'
})
export class NgxTableService {
  constructor() {}

  getMapOf<T>(array: T[], keyId?: string): MapOf<T> {
    return array.reduce((map: MapOf<T>, element: T, index) => {
      const key = keyId ?? index.toString();
      map[key] = element;
      return map;
    }, {});
  }

  getArrayOf<T>(map: MapOf<T>, keyIds: string[]): T[] {
    return keyIds.map((id) => map[id]);
  }

  getPages(array: string[], arraySize: number): Pages {
    const pages: Pages = {};
    const totalPages = Math.ceil(array.length / arraySize);
    let nextPage = 0;

    while (nextPage < totalPages) {
      pages[nextPage + 1] = array.slice(nextPage * arraySize, (nextPage + 1) * arraySize);
      nextPage++;
    }

    return pages;
  }
}
