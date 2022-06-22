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

        it('Suma rara', () => {
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
        it('mock suma', async () => {
            const spy = jest.spyOn(calculadora, 'suma');
            spy.mockReturnValue(5);
            expect(calculadora.suma(2, 2)).toBe(5);
            expect(spy).toBeCalled();
        });
        it('mock resta', async () => {
            const spy = jest.spyOn(calculadora, 'resta');
            spy.mockReturnValue(5);
            expect(calculadora.resta(2, 2)).toBe(5);
            expect(spy).toBeCalled();
        });
        it('mock producto', async () => {
            calculadora.multiplica = jest.fn();
            const spy = jest.spyOn(calculadora, 'multiplica');
            spy.mockReturnValue(5);
            expect(calculadora.multiplica(2, 2)).toBe(5);
            expect(spy).toBeCalled();
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
        return fs.promises.readFile(__filename, (err, data) => {
            if (err) throw err;
            expect(data.length).toBeGreaterThan(1000)
        })
    })

    it('leer async', async () => {
        let data = await fs.promises.readFile(__filename)
        expect(data.length).toBeGreaterThan(1000)
    })
})

describe('Dobles de prueba', () => {
    function queLLama(num, fn) {
        return fn(num) + 5
        //return 45
    }
    it('Crear función', () => {
        const mock = jest.fn(x => 42 + x);

        // expect(mock(3)).toBe(45)
        expect(queLLama(3, mock)).toBe(50)
        expect(mock.mock.calls.length).toBe(1)
        expect(mock.mock.calls[0][0]).toBe(3)
        expect(mock.mock.results[0].value).toBe(45)

    })

    it('Con valores predefinidos', () => {
        const myMock = jest.fn();
        myMock.mockReturnValue(4).mockReturnValueOnce(false).mockReturnValueOnce(true);
        expect(myMock()).toBeFalsy()
        expect(myMock()).toBeTruthy()
        expect(myMock()).toBe(4)
    })

    it('promesas resueltas', async () => {
        const asyncMock = jest.fn().mockResolvedValue(43);
        let rslt = await asyncMock(); // 43
        expect(rslt).toBe(43);
    });
    it('promesas rechazada', async () => {
        const asyncMock = jest.fn().mockRejectedValue(new Error("fallo"));
        //const asyncMock = jest.fn().mockResolvedValue(43);
        try {
            let rslt = await asyncMock();
            fail('Tenia que haber fallado')
        } catch (err) {
            expect(err.message).toBe('fallo');
        }
    });

})