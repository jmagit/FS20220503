const NOMBRE = 'Soy el modulo 2'
var a = 2

function interna(a, b) {
    return a - b;
}

function calcula(a, b) {
    return interna(a, b);
}

function principal() {
    return NOMBRE + a;
}

export { NOMBRE, calcula as calc, principal }
