import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardMask'
})
export class CreditCardMaskPipe implements PipeTransform {

  transform(plainCreditCard: number, visibleDigits: number = 4): string {
    // const visibleDigits = 4;
    const maskedSection = String(plainCreditCard).slice(0, -visibleDigits);
    const visibleSection = String(plainCreditCard).slice(-visibleDigits);
    return maskedSection.replace(/./g, '*') + visibleSection;
  }

}
