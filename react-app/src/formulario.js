import React from 'react';
import { ValidationMessage } from './utilidades/comunes';
import { esNIF } from './utilidades/biblioteca'
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
            esInvalido: false,
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
        this.validate()
    }

    componentDidMount() {
        this.validate()
    }
    validate() {
        if (this.form) {
            let esInvalido = false
            let errores = {}
            for (let cntr of this.form.current.elements) {
                if (cntr.name) {
                    // eslint-disable-next-line default-case
                    switch (cntr.name) {
                        case 'nif':
                            if (cntr.value && !esNIF(cntr.value))
                                cntr.setCustomValidity('No es un NIF valido')
                            else
                                cntr.setCustomValidity('')
                            break;
                        case 'recontraseña':
                            if (cntr.value && cntr.value !== this.form.current.elements.contraseña.value)
                                cntr.setCustomValidity('No es coinciden las contraseñas')
                            else
                                cntr.setCustomValidity('')
                            break;

                    }
                    errores[cntr.name] = cntr.validationMessage;
                    if(!cntr.validity.valid) esInvalido = true
                }
            }
            this.setState({ errores, esInvalido });
        }
    }

    render() {
         return (
            <form ref={this.form}>
                <p>
                    <label htmlFor='id'>código:</label>
                    <input type='number' id='id' name='id' value={this.state.elemento.id} onChange={this.handleChange}
                        required />
                    <ValidationMessage msg={this.state.errores.id} />
                    <br />
                    <label htmlFor='email'>correo:</label>
                    <input type='email' id='email' name='email' value={this.state.elemento.email} onChange={this.handleChange}
                        required minLength={3} />
                    <ValidationMessage msg={this.state.errores.email} />
                    <br />
                    <label htmlFor='nombre'>nombre:</label>
                    <input type='text' id='nombre' name='nombre' value={this.state.elemento.nombre} onChange={this.handleChange} minLength={2} />
                    <ValidationMessage msg={this.state.errores.nombre} />
                    <br />
                    <label htmlFor='contraseña'>contraseña:</label>
                    <input type='password' id='contraseña' name='contraseña' value={this.state.elemento.contraseña} onChange={this.handleChange}
                        required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}" />
                    <ValidationMessage msg={this.state.errores.contraseña} />
                    <br />
                    <label htmlFor='recontraseña'>repite contraseña:</label>
                    <input type='password' id='recontraseña' name='recontraseña' value={this.state.elemento.recontraseña} onChange={this.handleChange}
                        required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}" />
                    <ValidationMessage msg={this.state.errores.recontraseña} />
                    <br />
                    <label htmlFor='nif'>nif:</label>
                    <input type='text' id='nif' name='nif' value={this.state.elemento.nif} onChange={this.handleChange} />
                    <ValidationMessage msg={this.state.errores.nif} />
                </p>
                <p>
                    <input type="button" value="enviar" disabled={this.state.esInvalido} onClick={() => { 
                        let elemento = this.state.elemento
                        delete elemento.recontraseña
                        alert(JSON.stringify(elemento))
                        }} />
                    <input type="button" value="volver" />
       <input type="button" value="cargar" onClick={() => this.setState({elemento: {id: 99,
            email: 'p@g',
            nombre: 'Pepito',
            contraseña: 'kkkk',
            recontraseña: 'kkkk',
            nif: '4g',}})} />
                </p>
            </form>
        )
    }
}