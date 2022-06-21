const Calculadora = require('./calculadora')

describe('Pruebas de la calculadora', () => {
    let calculadora;

    beforeEach(() => {
        calculadora = new Calculadora()
    });
    describe('Pruebas de la suma', () => {
        it('Suma de enteros', () => {
            let calc = new Calculadora()

            let resultado = calc.suma(2, 3)

            expect(5).toBe(resultado)
        });
        it.todo('Esta pa luego');

        it.skip('Suma de rara', () => {
            let calc = new Calculadora()

            let resultado = calc.suma(0.1, 0.2)

            expect(0.3).toBe(resultado)
        });
        describe.each([
            [1, 1, 2], [1, 2, 3], [2, 1, 3],
        ])('.suma(%i, %i)', (a, b, expected) => {
            test(`returns ${expected}`, () => {
                expect(calculadora.suma(a, b)).toBe(expected);
            });
        });

    });
    describe('Pruebas de la division', () => {
        it('Divide enteros', () => {
            expect(calculadora.divide(3, 2)).toBe(1.5);
        })

        it('Divide por 0', () => {
            // expect(isFinite(calculadora.divide(3,0))).toBeFalsy()
            expect(() => calculadora.divide(3, 0)).toThrow()
        })
    });
})

const fs = require('fs');
describe('Asíncronas', () => {
    it('leer sincrónico', () => {
        const data = fs.readFileSync(__filename);
        expect(data).toBeDefined()
    })
    it('leer asíncrono', done => {
        let promesa = fs.readFile(__filename, (err, data) => {
            if (err) throw err;
            expect(data.length).toBeGreaterThan(1000)
            done()
        });
        // expect(promesa).toBeDefined()
    })
    it('leer promesa', () => {
        expect(fs.promises.readFile(__filename, (err, data) => {
            if (err) throw err;
            return data.length;
        })).resolves.toBeGreaterThan(1000)
    })

    it('leer async', async () => {
        let data = await fs.promises.readFile(__filename)
        expect(data.data.length).toBeGreaterThan(1000)
    })
})