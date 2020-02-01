import { Pipe, PipeTransform } from '@angular/core';
import {CurrencyPipe} from '@angular/common';

@Pipe({
  name: 'currencywithspace'
})
export class CurrencyWithSpacePipe extends CurrencyPipe implements PipeTransform {

  transform(value: any, currencyCode?: string, display?: string | boolean, digitsInfo?: string, locale?: string): string {
    console.log('a')
    const currencyFormat = super.transform(value, currencyCode, display, digitsInfo, locale);
    const firstDigit = currencyFormat.search(/\d/);
    return currencyFormat.substring(0, firstDigit) + ' ' + currencyFormat.substr(firstDigit);
  }

}
