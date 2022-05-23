import React from 'react'
import { connect } from 'react-redux'
import { contadorDownAction, contadorUpAction } from './store/my-store'
import { useSelector, useDispatch } from 'react-redux';
import { selectCount, initCount, increment, decrement, } from './store/contador-slice'

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


export default function ContadorNew() {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>{count}</h1>
            <p>
                <input type="button" value="-" onClick={() => dispatch(decrement())} />
                <input type="button" value="init" onClick={() => dispatch(initCount(10, 2))} />
                <input type="button" value="+" onClick={() => dispatch(increment())} />
            </p>
        </div>
    )
}
