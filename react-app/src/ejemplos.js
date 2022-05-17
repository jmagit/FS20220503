// export const Saluda = (props) => (<h1>Hola {props.nombre}</h1>)

import React from 'react';
import PropTypes from 'prop-types';

// export const Saluda = ({nombre}) => (<h1>Hola {nombre}</h1>)

export class Saluda extends React.Component {
    render() {
        // No está permitido
        // this.props.nombre = this.props.nombre.toUpperCase()
        return (
            <h1>Hola {this.props.nombre}</h1>
        )
    }
}
Saluda.propTypes = {
    nombre: PropTypes.string.isRequired,
    apellidos: PropTypes.string,
    edad: PropTypes.number
};
Saluda.defaultProps = {
    nombre: 'mundo',
    edad: 18
};


export const Card = ({ title, children }) => (
    <div className="card" >
        <div className="card-body">
            <h1 className="card-title">{title}</h1>
            <div className="card-text">{children}</div>
        </div>
    </div>
)

export class Contador extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contador: +props.init,
            delta: +props.delta
        };
        this.baja = this.baja.bind(this)
        this.init = this.init.bind(this)
        this.sube = (e) => {
            e.preventDefault();
            this.setState((prev, props) => {
                const cont = prev.contador + prev.delta
                this.notifyChange(cont)
                return { contador: cont }
            })
            };

    }
    baja(e) {
        e.preventDefault();
        this.setState((prev, props) => {
            const cont = prev.contador - prev.delta
            this.notifyChange(cont)
            return { contador: cont }
        })
    }

    init(value, e) {
        e.preventDefault();
        this.setState({ contador: value })
        this.notifyChange(value)
        // this.state.contador = value
    }
    notifyChange(value) {
        if(this.props.onChange) {
            this.props.onChange(value)
        }
    }
    render() {
        return (
            <div>
                <h1>{this.state.contador}</h1>
                <p>
                    <button onClick={this.sube}>Sube</button>&nbsp;
                    <button onClick={this.baja}>Baja</button>
                    <button onClick={(ev) => this.init(0, ev)}>init</button>
                    <button onClick={this.init.bind(this, 0)}>init</button>
                </p>
                <Saluda nombre={"Nombre " + this.state.contador} />
            </div>
        );
    }
}
Contador.propTypes = {
    init: PropTypes.number.isRequired,
    delta: PropTypes.number,
    onChange: PropTypes.func
};
Contador.defaultProps = {
    delta: 1
};
