import React, { Component } from "react";
import PropTypes from "prop-types";
import "./calculadora.css";
import { Calculadora as Calc } from './biblioteca';

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
    this.state = {
      pantalla: props.init.toString(),
      resumen: ""
    };
    this.calc = new Calc(
      // pantalla => this.setState({ pantalla }),
      // resumen => this.setState({ resumen }),
      pantalla => {},
      resumen => {}
    );
  }

  componentDidMount() {
    this.calc.onPantallaChange = pantalla => this.setState({ pantalla })
    this.calc.onResumenChange = resumen => this.setState({ resumen })
  }
  render() {
    let cabecera = [];
    if (this.state.resumen) {
      cabecera.push(<Resumen resumen={this.state.resumen} coma={this.props.coma} />)
    }
    cabecera.push(<Pantalla pantalla={this.state.pantalla} coma={this.props.coma} />)
    return (
      <div className="Calculadora">
        <Resumen resumen={this.state.resumen} />
        <Pantalla pantalla={this.state.pantalla} coma={this.props.coma} />
        <BtnCalcular css="btnOperar" texto="CE" onClick={this.calc.inicia} />
        <BtnCalcular css="btnOperar col-2x2" texto={'\u21B6 BORRAR'} onClick={this.calc.borrar} />
        <BtnCalcular css="btnOperar" texto="+" onClick={this.calc.calcula} />
        {[7, 8, 9].map(item => (
          <BtnCalcular key={"btn" + item} css="btnDigito" texto={item} onClick={this.calc.ponDigito} />
        ))}
        <BtnCalcular css="btnOperar" texto="-" onClick={this.calc.calcula} />
        {[4, 5, 6].map(item => (
          <BtnCalcular key={"btn" + item} css="btnDigito" texto={item} onClick={this.calc.ponDigito} />
        ))}
        <BtnCalcular css="btnOperar" texto="*" onClick={this.calc.calcula} />
        {[1, 2, 3].map(item => (
          <BtnCalcular key={"btn" + item} css="btnDigito" texto={item} onClick={this.calc.ponDigito} />
        ))}
        <BtnCalcular css="btnOperar" texto="/" onClick={this.calc.calcula} />
        <BtnCalcular css="btnDigito" texto="±" onClick={this.calc.cambiaSigno} />
        <BtnCalcular css="btnDigito" texto="0" onClick={this.calc.ponDigito} />
        <BtnCalcular css="btnDigito" texto={this.props.coma ? "," : "."} onClick={this.calc.ponComa} />
        <BtnCalcular css="btnOperar" texto="=" onClick={this.calc.calcula} />
      </div>
    );
  }
}
