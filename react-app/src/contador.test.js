import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from '@testing-library/react';
import { Contador } from './ejemplos'

describe('Contador como componente', () => {
    let container = null;
    beforeEach(() => {
        // configurar un elemento del DOM como objetivo del renderizado
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        // limpieza al salir
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    test('Creación', () => {
        let comp;
        act(() => {
            comp = render(<Contador init={10} />, { container })
        })
        // data-testid="pantalla"
        expect(comp.getByTestId('pantalla').textContent).toBe("10");
        expect(screen.getByTestId('pantalla').textContent).toBe("10");
        let tag = container.querySelector("h1")
        expect(tag).toBeInTheDocument();
        expect(tag.textContent).toBe("10");
        comp.unmount();
    })
    test('Creación con captura', () => {
        let comp;
        comp = render(<Contador init={10} />)
        expect(comp.container.querySelector("h1").textContent).toBe("10");
    })
    test('baja', () => {
        let comp;
        act(() => {
            comp = render(<Contador init={10} />, { container })
        })
        fireEvent.click(screen.getByText(/-/i))
        expect(comp.container.querySelector("h1").textContent).toBe("9");
       fireEvent.click(screen.getByText(/-/i))
        expect(comp.container.querySelector("h1").textContent).toBe("8");
    })
    test('sube', () => {
        let comp;
        act(() => {
            comp = render(<Contador init={10} />, { container })
        })
        fireEvent.click(screen.getByText(/\+/i))
        expect(comp.container.querySelector("h1").textContent).toBe("11");
        fireEvent.click(screen.getByText(/\+/i))
        expect(comp.container.querySelector("h1").textContent).toBe("12");
    })
    test('delta', () => {
        let comp;
        let delta = 2
        act(() => {
            comp = render(<Contador init={10} delta={delta} />, { container })
        })
        fireEvent.click(screen.getByText(/-/i))
        expect(comp.container.querySelector("h1").textContent).toBe("8");
        fireEvent.click(screen.getByText(/\+/i))
        fireEvent.click(screen.getByText(/\+/i))
        expect(comp.container.querySelector("h1").textContent).toBe("12");
    })
    test('onChange', () => {
        const mockCallback = jest.fn(x => x);
        let comp;
        act(() => {
            comp = render(<Contador init={10} onCambia={mockCallback} />, { container })
        })
        fireEvent.click(screen.getByText(/-/i))
        expect(comp.container.querySelector("h1").textContent).toBe("9");
        expect(mockCallback).toBeCalled();
        expect(mockCallback).lastCalledWith(9);
        fireEvent.click(screen.getByText(/\+/i))
        expect(mockCallback).lastReturnedWith(10);
        fireEvent.click(screen.getByText(/\+/i))
        expect(mockCallback).lastReturnedWith(11);
    })
});