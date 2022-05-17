import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import logo from './logo.svg';

// export const Saluda = (props) => (<h1>Hola {props.nombre}</h1>)

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

const Despide = (props) => (<h1>Adios {props.nombre}</h1>)

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

export default function Demos() {
    let [cont, setCont] = useState(10)

    const elelement = (
      <>
        <h1>Hola mundo</h1>
        <h2>Que tal</h2>
      </>
    )
    let nombre = 'Valladolid'
    let listado = [
      { "id": 1, "nombre": "Camelo", "apellidos": "Coton", "edad": 37, "telefonos": ["12342", "3453", "3334"] },
      { "id": 2, "nombre": "Pepito", "apellidos": "Grillo", "edad": 67 },
      { "id": 3, "nombre": "<b>Pierre</b>", "apellidos": "Nodoiuna", "edad": 55 },
      { "id": 4, "nombre": "Capitan", "apellidos": "Tan", "edad": 18 },
    ]
    function negrita(item) {
      if (item.id % 2) {
        return <b>{item.nombre}</b>
      } else {
        return <>{item.nombre}</>
      }
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1>{process.env.REACT_APP_NOMBRE}</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="btn btn-info"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <h1>Secreto: {process.env.REACT_APP_SECRET}</h1>
        </header>
        <Contador init={cont} delta={2} onChange={value => setCont(value)} />
        <p>El contador vale {cont}</p>
        {elelement}
        {nombre && <h3 className='alert alert-danger'>Hola {nombre.toUpperCase()}!!!</h3>}
        <ul>
          {listado.map(item => (
            // <li key={item.id}><span dangerouslySetInnerHTML={{__html: item.nombre}} /> {item.apellidos}</li>
            <li key={item.id} className={item.id % 2 ? 'alert-danger' : 'alert-info'}>{negrita(item)} {item.apellidos}</li>
          ))}
        </ul>
        <Card title="Titulo de la tarjeta">
          <Saluda nombre="Don Pepito" edad={33} />
          <Saluda nombre="Don Jose" />
          <Saluda nombre={nombre + cont} />
          <Despide nombre="Don Pepito" />
          <Despide nombre="Don Jose" />
        </Card>
      </div>
    );
}