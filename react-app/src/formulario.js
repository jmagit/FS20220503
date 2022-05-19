import React from 'react';
import { ValidationMessage } from './comunes';

export default class Formulario extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            elemento: {
                id: 0,
                email: '',
                nombre: 'Pepito',
                contraseña: '',
                recontraseña: '',
                nif: '',
            },
            esInvalido: true,
            errores: {}
        }
        this.form = React.createRef();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let cmp = event.target.name
        let value = event.target.value
        this.setState(prev => {
            let elemento = this.state.elemento;
            elemento[cmp] = value
            return { elemento }
        });

    }

    render() {
        return (
            <form ref={this.form}>
                <p>
                    <label htmlFor='id'>código:</label>
                    <input type='number' id='id' name='id' value={this.state.elemento.id} onChange={this.handleChange} />
                    <ValidationMessage msg={this.state.errores.id} />
                    <br />
                    <label htmlFor='email'>correo:</label>
                    <input type='email' id='email' name='email' value={this.state.elemento.email} onChange={this.handleChange} />
                    <ValidationMessage msg={this.state.errores.email} />
                    <br />
                    <label htmlFor='nombre'>nombre:</label>
                    <input type='text' id='nombre' name='nombre' value={this.state.elemento.nombre} onChange={this.handleChange} />
                    <ValidationMessage msg={this.state.errores.nombre} />
                    <br />
                    <label htmlFor='contraseña'>contraseña:</label>
                    <input type='password' id='contraseña' name='contraseña' value={this.state.elemento.contraseña} onChange={this.handleChange} />
                    <ValidationMessage msg={this.state.errores.contraseña} />
                    <br />
                    <label htmlFor='recontraseña'>repite contraseña:</label>
                    <input type='password' id='recontraseña' name='recontraseña' value={this.state.elemento.recontraseña} onChange={this.handleChange} />
                    <ValidationMessage msg={this.state.errores.recontraseña} />
                    <br />
                    <label htmlFor='nif'>nif:</label>
                    <input type='text' id='nif' name='nif' value={this.state.elemento.nif} onChange={this.handleChange} />
                    <ValidationMessage msg={this.state.errores.nif} />
                </p>
                <p>
                    <input type="button" value="enviar" disabled={this.state.esInvalido} />
                    <input type="button" value="volver"  />
                </p>
            </form>
        )
    }
}