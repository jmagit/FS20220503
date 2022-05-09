import { saluda } from './comunes.js';
export const NOMBRE = 'Soy el modulo 1'
var a = 1

function interna(a, b) {
    return a + b;
}

export function calcula(a, b) {
    return interna(a, b);
}

export default function principal() {
    return saluda(NOMBRE + 1);
}