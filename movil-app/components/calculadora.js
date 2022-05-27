import { StyleSheet, Text, View, Button, TouchableOpacity, Appearance } from 'react-native';
import { useState } from 'react';

const Pantalla = props => (
    <Text style={props.style}>
        {props.coma ? props.pantalla.replace(/\./g, ",") : props.pantalla}
    </Text>
)

const Resumen = ({ coma, resumen, style }) => (
    <Text style={style}>
        {coma ? resumen.replace(/\./g, ",") : resumen}
    </Text>
)

const BtnCalcular = ({ texto, onClick, style }) => {
    const handleClick = () => {
        if (onClick) onClick(texto);
    };
    return (
        // <Button style={style} onPress={handleClick} title={texto} />
        <TouchableOpacity style={style} onPress={handleClick} >
            <Text style={{ fontSize: 28, color: Appearance.getColorScheme() === 'dark' ? '#b5b7bb' : '#7c7c7c' }}>{texto}</Text>
        </TouchableOpacity>
    );
}

export default function Calculadora(props) {
    const [darkMode, setDarkMode] = useState(Appearance.getColorScheme() === 'dark');
    const [pantalla, setPantalla] = useState(props.init ? props.init.toString() : '0');
    const [resumen, setResumen] = useState('');
    const [acumulado, setAcumulado] = useState(0);
    const [operador, setOperador] = useState('+');
    const [limpiar, setLimpiar] = useState(true);

    const inicia = () => {
        setAcumulado(0)
        setOperador('+')
        setLimpiar(true)
        setPantalla('0')
        setResumen('')
    }
    const ponDigito = (value) => {
        if (typeof value !== "string") {
            value = value.toString();
        }
        if (value.length !== 1 || value < "0" || value > "9") {
            console.error("No es un valor numérico.");
            return;
        }
        if (limpiar || pantalla === "0") {
            setPantalla(value)
            setLimpiar(false)
        } else {
            setPantalla(pantalla + value)
        }
    }
    const ponOperando = (value) => {
        // eslint-disable-next-line eqeqeq
        if (!Number.isNaN(parseFloat(value)) && parseFloat(value) == value) {
            setPantalla(value);
            setLimpiar(false);
        } else {
            console.error('No es un valor numérico.');
        }
    }
    const ponComa = () => {
        if (limpiar) {
            if (!isFinite(acumulado) || isNaN(acumulado)) {
                return;
            }
            setPantalla("0.");
            setLimpiar(false);
        } else if (pantalla.indexOf(".") === -1) {
            setPantalla(pantalla + ".");
        } else
            //store.AddNotify('Ya está la coma');
            console.warn('Ya está la coma');
    }
    const borrar = () => {
        if (limpiar || pantalla.length === 1) {
            setPantalla("0");
            setLimpiar(true);
        } else {
            setPantalla(pantalla.substr(0, pantalla.length - 1));
        }
    }
    const cambiaSigno = () => {
        setPantalla((-pantalla).toString());
        if (limpiar) {
            setAcumulado(-acumulado);
        }
    }
    const calcula = (value) => {
        if ("+-*/=".indexOf(value) === -1) {
            console.error(`Operación no soportada: ${value}`);
            return;
        }
        const operando = parseFloat(pantalla);
        let resultado = acumulado
        switch (operador) {
            case "+":
                resultado += operando;
                break;
            case "-":
                resultado -= operando;
                break;
            case "*":
                resultado *= operando;
                break;
            case "/":
                resultado /= operando;
                break;
            case "=":
            default:
                break;
        }
        setAcumulado(resultado)
        // Con eval()
        // setAcumulado(val (acumulado + operador + pantalla));
        setResumen(value === '=' ? '' : (`${resultado} ${value}`));
        // Number: double-precision IEEE 754 floating point.
        // 9.9 + 1.3, 0.1 + 0.2, 1.0 - 0.9
        setPantalla(parseFloat(resultado.toPrecision(15)).toString());
        setOperador(value);
        setLimpiar(true);
        if (props.onChange) props.onChange(resultado);
    }

    //const styles = StyleSheet.compose(stylesCommons, darkMode ? darkTheme: lightTheme)
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            // justifyContent: 'space-between',
            // alignItems: 'stretch',
        },
        visor: {
            backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
            maxWidth: '100%',
            height: '20%',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
        },
        pantalla: {
            maxHeight: 45,
            color: '#00b9d6',
            margin: 15,
            fontSize: 35,
        },
        resumen: {
            color: darkMode ? '#B5B7BB' : '#7c7c7c',
            fontSize: 20,
            marginRight: 10,
            alignSelf: 'flex-end',
        },
        botones: {
            width: '100%',
            height: '80%',
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        boton: {
            borderColor: darkMode ? '#3f4d5b' : '#e5e5e5',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '24%',
            minHeight: '20%',
            flex: 2,
        },
        textoBoton: {
            color: darkMode ? '#b5b7bb' : '#7c7c7c',
            fontSize: 28,
        },
        btnOperar: {
            color: 'white',
            backgroundColor: darkMode ? '#414853' : '#00b9d6'
        },
        btnComando: {
            backgroundColor: darkMode ? '#414853' : '#ededed'
        },
        btnDigito: {
            backgroundColor: darkMode ? '#303946' : '#fff'
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.visor}>
                <Text style={styles.resumen}>{resumen}</Text>
                <Text style={styles.pantalla}>{pantalla}</Text>
            </View>
            <View style={styles.botones}>
                <BtnCalcular style={[styles.boton, styles.btnComando]} texto="CE" onClick={inicia} />
                <BtnCalcular style={[styles.boton, styles.btnComando, { minWidth: '49%' }]} texto={'\u21B6 BORRAR'} onClick={borrar} />
                <BtnCalcular style={[styles.boton, styles.btnOperar]} texto="+" onClick={calcula} />
                {[7, 8, 9].map(item => (
                    <BtnCalcular key={"btn" + item} style={[styles.boton, styles.btnDigito]} texto={item} onClick={ponDigito} />
                ))}
                <BtnCalcular style={[styles.boton, styles.btnOperar]} texto="-" onClick={calcula} />
                {[4, 5, 6].map(item => (
                    <BtnCalcular key={"btn" + item} style={[styles.boton, styles.btnDigito]} texto={item} onClick={ponDigito} />
                ))}
                <BtnCalcular style={[styles.boton, styles.btnOperar]} texto="*" onClick={calcula} />
                {[1, 2, 3].map(item => (
                    <BtnCalcular key={"btn" + item} style={[styles.boton, styles.btnDigito]} texto={item} onClick={ponDigito} />
                ))}
                <BtnCalcular style={[styles.boton, styles.btnOperar]} texto="/" onClick={calcula} />
                <BtnCalcular style={[styles.boton, styles.btnDigito]} texto="±" onClick={cambiaSigno} />
                <BtnCalcular style={[styles.boton, styles.btnDigito]} texto="0" onClick={ponDigito} />
                <BtnCalcular style={[styles.boton, styles.btnDigito]} texto={props.coma ? "," : "."} onClick={ponComa} />
                <BtnCalcular style={[styles.boton, styles.btnOperar]} texto="=" onClick={calcula} />
            </View>
        </View>
    )
}

const stylesCommons = StyleSheet.create({
    visor: {
        maxWidth: '100%',
        minHeight: '35%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    pantalla: {
        maxHeight: 45,
        color: '#00b9d6',
        margin: 15,
        fontSize: 35,
    },
    resumen: {
        fontSize: 20,
        marginRight: 10,
        alignSelf: 'flex-end',
    },
    botones: {
        width: '100%',
        height: '35%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    boton: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '24%',
        minHeight: '54%',
        flex: 2,
    },
    textoBoton: {
        fontSize: 28,
    },
    btnOperar: {
    },
    btnDigito: {
    }
})
const darkTheme = StyleSheet.create({
    visor: {
        backgroundColor: '#282f3b',
    },
    resumen: {
        color: '#B5B7BB',
    },
    boton: {
        borderColor: '#3f4d5b',
    },
    textoBoton: {
        color: '#b5b7bb',
    },
    btnOperar: {
        backgroundColor: '#414853'
    },
    btnDigito: {
        backgroundColor: '#303946'
    }
})
const lightTheme = StyleSheet.create({
    visor: {
        backgroundColor: '#f5f5f5',
    },
    resumen: {
        color: '#7c7c7c',
    },
    boton: {
        borderColor: '#e5e5e5',
    },
    textoBoton: {
        color: '#7c7c7c',
    },
    btnOperar: {
        backgroundColor: '#ededed'
    },
    btnDigito: {
        backgroundColor: '#fff'
    }
})


