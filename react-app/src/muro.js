import React, { Component } from "react";
import { Contador } from './ejemplos';

class FotoCard extends Component {
  render() {
    return (
      <div
        className="card"
        style={{ width: this.props.dim + "px" }} >
        <img
          src={this.props.foto}
          className="card-img-top rounded"
          style={{ cursor: "pointer" }}
          alt={this.props.titulo}
          title={this.props.titulo}
          onClick={ev => { ev.preventDefault(); if (this.props.onSelecciona) this.props.onSelecciona(); return false; }}
        />
        {this.props.dim >= 96 && (
          <div className="card-body">
            <h5 className="card-title">{this.props.titulo}</h5>
            {this.props.dim >= 256 && (
              <p className="card-text">{this.props.children}</p>
            )}
          </div>
        )}
      </div>
    );
  }
}
class FotoButton extends Component {
  render() {
    return (
      <>
        {this.props.onSelecciona &&
          <button
            style={this.props.tamaño}
            onClick={ev => { ev.stopPropagation(); this.props.onSelecciona(); return false; }} >
            {this.props.children}
          </button>
        }
      </>);
  }
}

export default class FotoMuro extends Component {
  constructor(props) {
    super(props);
    const max = 10;
    // const t = (new Array(max)).fill(null, 0, max);
    // for (let i = 0; i < t.length; i++) {
    //   t[i] = new Array(max).fill(null, 0, max);
    // }
    this.state = { 
      listado: (new Array(max)).fill(null, 0, max).map(() => new Array(max).fill(null, 0, max)), 
      dim: 128, 
      loading: false,
      page: 0,
     };
  }
  cambia(f, c) {
    this.setState(prev => {
      let alea = Math.floor(Math.random() * 1000);
      prev.listado[f][c] = {download_url: `https://picsum.photos/id/${alea}/512/512`};
      return { listado: prev.listado };
    });
  }
  anula(f, c) {
    this.setState(prev => {
      prev.listado[f][c] = null;
      return { listado: prev.listado };
    });
  }
  componentDidMount() {
    this.intervalo = setInterval(() => {
      console.log('tic')
      const f = Math.floor(Math.random() * this.state.listado.length);
      const c = Math.floor(Math.random() * this.state.listado[0].length);
      if (!this.state.listado[f][c]) this.cambia(f, c);
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalo);
  }

  render() {
    // if(this.state.listado[0][0]) throw new Error("Forzado");

    const tamaño = {
      height: this.state.dim,
      width: this.state.dim,
      fontSize: this.state.dim / 64 + "em"
    };
    const rslt = this.state.listado.map((fila, index) => {
      return (
        <div className="row" key={"F" + index.toString()}>
          {fila.map((celda, subindex) => (
            <div
              className="col"
              key={"F" + index.toString() + "C" + subindex.toString()} >
              {celda ? (
                <FotoCard
                  foto={celda.download_url}
                  titulo={index + 1 + "-" + (subindex + 1)}
                  dim={this.state.dim}
                  onSelecciona={this.anula.bind(this, index, subindex)} >
                  Descargado de {celda}
                </FotoCard>
              ) : (
                  <FotoButton tamaño={tamaño}
                    onSelecciona={this.cambia.bind(this, index, subindex)} >
                    {index + 1 + "-" + (subindex + 1)}
                  </FotoButton>
                )}
            </div>
          ))}
        </div>
      );
    });
    return (
      <div>
        <Contador init={this.state.dim} delta={32} min={32} max={512} onChange={rslt => this.setState({ dim: rslt })} />
        <div className="container-fluid">{rslt}</div>
      </div>
    );
  }

}
