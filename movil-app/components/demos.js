import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, FlatList, SectionList, Image } from 'react-native';
import Contador from './contador';
import importImg from '../assets/favicon.png'
import data from '../data/contactos.json'
import Calculadora from './calculadora';

export default function Demos() {
    console.log('Iniciando aplicación')
    return (
        <View>
            <Calculadora />
            <StatusBar hidden />
        </View>
    )
}

function EjemploInicial() {
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <Button title='click' />
        </View>
    );
}

const fotox = '../assets/icon.png'

function Fotos() {
    const foto = props.grande ? '../assets/icon.png' : '../assets/favicon.png'
    return (
        <View>
            <Image source={importImg} style={{ width: 40, height: 40 }} />
            <Image source={require(fotox)} style={{ width: 40, height: 40 }} />
            <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png', width: 100, height: 100 }} />
            <Image source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==', width: 40, height: 40 }} />
        </View>

    )
}

function ContactosItem(props) {
    return (
        <View style={{ marginBottom: 5 }}>
            <Text>{props.nombre} {props.apellidos}</Text>
            <Text>{props.email}</Text>
        </View>
    )
}
function ContactosList() {
    return (
        <FlatList
            data={data}
            renderItem={data => <ContactosItem {...data.item} />}
            keyExtractor={item => item.id}
        />
    )
}

function ClasificaLista() {
    const DATA = [
        { title: 'Main dishes', data: ['Pizza', 'Burger', 'Risotto'] },
        { title: 'Sides', data: ['French Fries', 'Onion Rings', 'Fried Shrimps'] },
        { title: 'Drinks', data: ['Water', 'Coke', 'Beer'] },
        { title: 'Desserts', data: ['Cheese Cake', 'Ice Cream'] },
    ]
    return (
        <SectionList
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
                <View style={styles.item}><Text style={styles.title}>{item}</Text></View>
            )}
            renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
            )}
        />
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24
    }
});
