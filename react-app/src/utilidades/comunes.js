import { Component, useState, useEffect, useRef } from "react";
import { NavLink } from 'react-router-dom';
import './comunes.css';
import loadingImage from '../imagenes/loading.gif';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {  // Actualiza el estado para que el siguiente renderizado lo muestre
    return { hasError: true };
  }
  componentDidCatch(error, info) {  // También puedes registrar el error en un servicio de reporte de errores
    this.setState({ hasError: true, error: error, errorInfo: info })
  }
  render() {
    if (this.state.hasError) { // Puedes renderizar cualquier interfaz de repuesto
      return <div>
        <h1>ERROR</h1>
        {this.state.error && <p>{this.state.error.toString()}</p>}
        {this.state.errorInfo && <p>{this.state.errorInfo.componentStack}</p>}
      </div>;
    }
    return this.props.children;
  }
}

export function Esperando() {
    return <div>
      <div className="ajax-wait"></div>
      <img className="ajax-wait" src={loadingImage} alt="Cargando ..." />
    </div>;
}

export function PageNotFound() {
  return (
    <h1>404 Page not found!!!</h1>
  )
}

export class ValidationMessage extends Component {
  render() {
    if (this.props.msg) {
      return <output className="errorMsg">{this.props.msg}</output>;
    }
    return null;
  }
}
export class ErrorMessage extends Component {
  render() {
    if (this.props.msg) {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {this.props.msg}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={e => this.props.onClear && this.props.onClear()}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
    return null;
  }
}
export function useCoordenadas() {
  const [coordenadas, setCoordenadas] = useState({ latitud: null, longitud: null });
  const watchId = useRef(0);
  useEffect(() => {
    watchId.current = window.navigator.geolocation.watchPosition(pos => {
      setCoordenadas({
        latitud: pos.coords.latitude,
        longitud: pos.coords.longitude
      })
    });
    return () => window.navigator.geolocation.clearWatch(watchId.current);
  });
  return coordenadas;
}

export function CoordenadasEx(props) {
  const coordenadas = useCoordenadas();
  return coordenadas.latitud == null ? (<div>Cargando</div>) : (
    <div>
      <h1>Coordenadas</h1>
      <h2>Latitud: {coordenadas.latitud}</h2>
      <h2>Longitud: {coordenadas.longitud}</h2>
    </div>
  );
}
export function Coordenadas(props) {
  const [coordenadas, setCoordenadas] = useState({ latitud: null, longitud: null});
  let watchId = null;
  useEffect(() => {
    watchId = window.navigator.geolocation.watchPosition(pos => {
      setCoordenadas({latitud: pos.coords.latitude, longitud: pos.coords.longitude });
      console.log(pos);
    });
    return () => window.navigator.geolocation.clearWatch(watchId);
  });
  return coordenadas.latitud == null ? (<div>Cargando...</div>) : (
      <div>
        <h1>Coordenadas</h1>
        <h2>Latitud: {coordenadas.latitud}</h2>
        <h2>Longitud: {coordenadas.longitud}</h2>
      </div>
    );
}

export function Paginacion({ actual, total, url }) {
  let items = [];
  for (let number = 0; number < total; number++) {
      items.push(
          number === actual ?
              <li key={number} className="page-item active" aria-current="page"><NavLink to={url + number} className="page-link">{number + 1}</NavLink></li>
              :
              <li key={number} className="page-item"><NavLink to={url + number} className="page-link">{number + 1}</NavLink></li>
      );
  }
  return (
      <nav aria-label="Page navigation">
          <ul className="pagination">
              {items}
          </ul>
      </nav>
  )
}