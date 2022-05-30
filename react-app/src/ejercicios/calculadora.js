import React, { Component } from "react";
import PropTypes from "prop-types";
import store from "../store/store";
import "./calculadora.css";

const Pantalla = props => (
  <output className="Pantalla">
    {props.coma ? props.pantalla.replace(/\./g, ",") : props.pantalla}
  </output>
);
const Resumen = ({coma, resumen}) => (
  <output className="Resumen">
    {coma ? resumen.replace(/\./g, ",") : resumen}
  </output>
);
class BtnCalcular extends Component {
  constructor(props) {
    super(props);
    this.handleClick = () => {
      if (this.props.onClick) this.props.onClick(this.props.texto);
    };
  }
  render() {
    return (
      <button className={this.props.css} onClick={this.handleClick}>
        {this.props.texto}
      </button>
    );
  }
}
export default class Calculadora extends Component {
  static propTypes = {
    init: PropTypes.number,
    onChange: PropTypes.func,
    coma: PropTypes.bool
  };
  static defaultProps = {
    init: 0,
    coma: false
  };
  constructor(props) {
    super(props);
    this.acumulado = 0;
    this.operador = "+";
    this.limpiar = true;
    this.state = {
      pantalla: props.init.toString(),
      resumen: ""
    };

    this.inicia = this.inicia.bind(this);
    this.ponDigito = this.ponDigito.bind(this);
    this.ponComa = this.ponComa.bind(this);
    this.borrar = this.borrar.bind(this);
    this.cambiaSigno = this.cambiaSigno.bind(this);
    this.calcula = this.calcula.bind(this);
  }

  render() {
    let cabecera = [];
    if (this.state.resumen) {
      cabecera.push(<Resumen key="resumen" resumen={this.state.resumen} coma={this.props.coma} />)
    }
    cabecera.push(<Pantalla key="pantalla" pantalla={this.state.pantalla} coma={this.props.coma} />)
    return (
      <div className="Calculadora">
        {/* <Resumen resumen={this.state.resumen} />
        <Pantalla pantalla={this.state.pantalla} coma={this.props.coma} /> */}
        {cabecera}
        <BtnCalcular css="btnOperar" texto="CE" onClick={this.inicia} />
        <BtnCalcular css="btnOperar col-2x2" texto={'\u21B6 BORRAR'} onClick={this.borrar} />
        <BtnCalcular css="btnOperar" texto="+" onClick={this.calcula} />
        {[7, 8, 9].map(item => (
          <BtnCalcular key={"btn" + item} css="btnDigito" texto={item} onClick={this.ponDigito} />
        ))}
        <BtnCalcular css="btnOperar" texto="-" onClick={this.calcula} />
        {[4, 5, 6].map(item => (
          <BtnCalcular key={"btn" + item} css="btnDigito" texto={item} onClick={this.ponDigito} />
        ))}
        <BtnCalcular css="btnOperar" texto="*" onClick={this.calcula} />
        {[1, 2, 3].map(item => (
          <BtnCalcular key={"btn" + item} css="btnDigito" texto={item} onClick={this.ponDigito} />
        ))}
        <BtnCalcular css="btnOperar" texto="/" onClick={this.calcula} />
        <BtnCalcular css="btnDigito" texto="±" onClick={this.cambiaSigno} />
        <BtnCalcular css="btnDigito" texto="0" onClick={this.ponDigito} />
        <BtnCalcular css="btnDigito" texto={this.props.coma ? "," : "."} onClick={this.ponComa} />
        <BtnCalcular css="btnOperar" texto="=" onClick={this.calcula} />
      </div>
    );
  }
  inicia() {
    this.acumulado = 0;
    this.operador = "+";
    this.limpiar = true;
    this.setState({ pantalla: "0", resumen: "" });
  }

  ponDigito(value) {
    if (typeof value !== "string") {
      value = value.toString();
    }
    if (value.length !== 1 || value < "0" || value > "9") {
      console.error("No es un valor numérico.");
      return;
    }
    if (this.limpiar || this.state.pantalla === "0") {
      this.setState({ pantalla: value });
      this.limpiar = false;
    } else {
      this.setState(prev => {
        return { pantalla: prev.pantalla + value };
      });
    }
  }
  ponOperando(value) {
		// eslint-disable-next-line eqeqeq
		if (!Number.isNaN(parseFloat(value)) && parseFloat(value) == value) {
      this.setState({ pantalla: value });
      this.limpiar = false;
		} else {
			console.error('No es un valor numérico.');
		}
	}

  ponComa() {
    if (this.limpiar) {
      if (!isFinite(this.acumulado) || isNaN(this.acumulado)) {
        return;
      }
      this.setState({ pantalla: "0." });
      this.limpiar = false;
    } else if (this.state.pantalla.indexOf(".") === -1) {
      this.setState(prev => {
        return { pantalla: prev.pantalla + "." };
      });
    } else
      store.AddNotify('Ya está la coma');
			//console.warn('Ya está la coma');
  }

  borrar() {
    if (this.limpiar || this.state.pantalla.length === 1) {
      this.setState({ pantalla: "0" });
      this.limpiar = true;
    } else {
      this.setState(prev => {
        return { pantalla: prev.pantalla.substr(0, prev.pantalla.length - 1) };
      });
    }
  }

  cambiaSigno() {
    this.setState(prev => ({ pantalla: (-prev.pantalla).toString() }));
    if (this.limpiar) {
      this.acumulado = -this.acumulado;
    }
  }

  calcula(value) {
    if ("+-*/=".indexOf(value) === -1) {
      console.error(`Operación no soportada: ${value}`);
      return;
    }
    let pantalla = this.state.pantalla;
    let resumen = this.state.resumen;
    const operando = parseFloat(pantalla);
    switch (this.operador) {
      case "+":
        this.acumulado += operando;
        break;
      case "-":
        this.acumulado -= operando;
        break;
      case "*":
        this.acumulado *= operando;
        break;
      case "/":
        this.acumulado /= operando;
        break;
      case "=":
      default:
        break;
    }
    // Con eval()
    // acumulado = eval (acumulado + this.operador + pantalla);
		resumen = value === '=' ? '' : (`${this.acumulado} ${value}`);
		// Number: double-precision IEEE 754 floating point.
		// 9.9 + 1.3, 0.1 + 0.2, 1.0 - 0.9
		pantalla = parseFloat(this.acumulado.toPrecision(15)).toString();
    this.operador = value;
    this.limpiar = true;
    if (this.props.onChange) this.props.onChange(this.acumulado);
    this.setState({ pantalla, resumen });
  }
}
