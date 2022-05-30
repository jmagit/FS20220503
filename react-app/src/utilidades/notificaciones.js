import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { remove, clear, selectListado, selectHayNotificaciones } from '../store/notification-slice'

export const Notificaciones = () => {
    const listado = useSelector(selectListado);
    const ocultar = !useSelector(selectHayNotificaciones);
    const dispatch = useDispatch();

    if (ocultar) return null;
    return <div className="container-fluid" >
        {listado.map((item, index) => <div key={index} className="alert alert-danger alert-dismissible fade show" role="alert">
            {item}
            <button type="button" className="btn-close" aria-label="Close" onClick={() => dispatch(remove(index))} />
        </div>)}
        <div className="text-center">
            <input type="button" className="btn btn-dark" value="Cerrar" onClick={() => dispatch(clear())} />
        </div>
    </div>
} 
