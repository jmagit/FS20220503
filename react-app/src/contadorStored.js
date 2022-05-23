import React from 'react'
import { connect } from 'react-redux'
import { contadorDownAction, contadorUpAction } from './my-store'
const contadorStored = ({ contador, onSube, onBaja }) => (
    <div>
      <h1>{contador}</h1>
      <p><button onClick={onSube}>Sube</button>&nbsp; <button onClick={onBaja}>Baja</button></p>
    </div>
)

export const ContadorStored = connect(
    (state, ownProps) => {
        return {
            contador: state.contador
        }
    },
    (dispatch, ownProps) => {
        return {
            onSube: () => { dispatch(contadorUpAction(1)) },
            onBaja: () => { dispatch(contadorDownAction(1)) },
        }
    }
)(contadorStored)
