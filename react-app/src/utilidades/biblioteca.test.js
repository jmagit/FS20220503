import { esNIF } from './biblioteca'

describe('Pruebas del esNIF', () => {
    describe.each([
        '12345678z', '12345678Z', '1234S', '4g'
      ])('OK (%s)', (nif) => {
        test(`OK ${nif}`, () => {
          expect(esNIF(nif)).toBeTruthy()
        });
      });
      describe.each([
        '12345678', 'Z12345678', '1234J', null
      ])('KO (%s)', (nif) => {
        test(`KO ${nif}`, () => {
          expect(esNIF(nif)).toBeFalsy()
        });
      });
      
})