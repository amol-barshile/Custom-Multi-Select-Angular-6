import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
   transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      if (it.username) {
        return it.username.toLowerCase().includes(searchText);
      }
      if (it.mcc_code) {
        return it.mcc_code.toLowerCase().includes(searchText);
      }
      if (it.mnc_code) {
        return it.mnc_code.toLowerCase().includes(searchText);
      }
      // if (it.nickName) {
      //     return it.nickName.toLowerCase().includes(searchText);
      // }
      // if (it.name) {
      //     return it.name.toLowerCase().includes(searchText);
      // }
    });
  }
}
