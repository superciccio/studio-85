import { CurrencyWithSpacePipe } from './currency-with-space.pipe';

describe('CurrencyWithSpacePipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyWithSpacePipe();
    expect(pipe).toBeTruthy();
  });
});
