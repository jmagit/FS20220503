// export const Saluda = (props) => (<h1>Hola {props.nombre}</h1>)

import React from 'react';

// export const Saluda = ({nombre}) => (<h1>Hola {nombre}</h1>)

export class Saluda extends React.Component {
    constructor(props) {
        super(props)
        let { nombre, apellidos } = props
        this.nombre = nombre
    }
    render() {
        return (
            <h1>Hola {this.nombre}</h1>
        )
    }
}

export const Card = ({ title, children }) => (
    <div className="card" >
        <div className="card-body">
            <h1 className="card-title">{title}</h1>
            <div className="card-text">{children}</div>
        </div>
    </div>
)