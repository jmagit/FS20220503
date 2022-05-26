import React from 'react'
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet, Text, View, Button, ScrollView, FlatList, SectionList, Image, ActivityIndicator,
    TextInput, KeyboardAvoidingView, Platform, Keyboard, Switch, Modal, Share, Vibration,
    TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback,
} from 'react-native';
import Contador from './contador';
import importImg from '../assets/favicon.png'
import data from '../data/contactos.json'
import Calculadora from './calculadora';
import styles from '../theme/styles';

export default function Demos() {
    console.log('Iniciando aplicación')
    return (
        <View style={{ flex: 1 }}>
            <ShareExample style={[styles.texto, styles.error, { color: 'yellow'}]} />
            <StatusBar hidden />
        </View>
    )
}

const ShareExample = () => {
    const onShare = async () => {
      try {
        const result = await Share.share({
          message:
            'React Native | A framework for building native apps using React',
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };
    const SECONDS = 1000;

    return (
      <View style={{ marginTop: 50 }}>
        <Button onPress={onShare} title="Share" />
        <Button onPress={() => Vibration.vibrate([1 * SECONDS, 5 * SECONDS, 2 * SECONDS], true)} title="vibratem" />
      </View>
    );
  };

const EstilosView = ({style}) => {
    console.log(style)
    console.log(Object.assign({}, ...style))
    return (
        <View style={styles.containerFluid}>
            <Text style={styles.texto}>Uno 
            <Text style={{fontSize: 12}}>Pequeño</Text>
            <Text style={styles.cursiva}>anidado</Text>
            </Text>
            <TouchableWithoutFeedback onPress={()=>alert('click')}>
                <Text style={[styles.texto, styles.error, { color: 'yellow'}]}>Dos</Text>
            </TouchableWithoutFeedback>
            <Text>Tres</Text>
            <Text style={{color: styles.containerFluid.color}}>Cuatro</Text>
            <Text>Cinco</Text>
            <Button title='Boton' style={{backgroundColor: 'red', color: 'yellow'}} color='red' onPress={()=>alert('click')} />

        </View>
        
    )
}

const ModalView = ({ texto }) => {
    const [modalVisible, setModalVisible] = React.useState(false)
    const [nombre, setNombre] = React.useState('mundo')
    const [isEnabled, setIsEnabled] = React.useState(false)
    const modalStyles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
        },
        modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        modalText: {
            marginBottom: 15,
            textAlign: 'center',
        },
    })

    return (
        <View style={modalStyles.centeredView}>
            <Modal animationType='slide' transparent visible={modalVisible}>
                <View style={modalStyles.centeredView}>
                    <View style={modalStyles.modalView}>
                        <Text style={modalStyles.modalText}>{texto}</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor='#3e3e3e'
                            value={isEnabled} onValueChange={() => setIsEnabled(previousState => !previousState)}
                        />
                        <Button title='Cerrar' onPress={() => setModalVisible(!modalVisible)} />
                    </View>
                </View>
            </Modal>
            <Text>{isEnabled ? 'Hola' : 'Adios'} {nombre}</Text>
            <Button title='Ver modal' onPress={() => setModalVisible(true)} />
        </View>
    )
}

const EntradasTextInput = () => {
    const [text, onChangeText] = React.useState('Hola mundo')
    const [number, onChangeNumber] = React.useState(null)
    const styles = StyleSheet.create({
        input: {
            borderWidth: 1,
            color: 'red',
            fontSize: 24,
            margin: 5
        },
        textoGrande: {
            marginTop: 50,
            fontSize: 48
        }

    })
    return (
        <View>
            <Button title='cierra' onPress={() => Keyboard.dismiss()} />
            <ToggleButton />
            <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
                <Text style={styles.textoGrande}>{text}</Text>
            </TouchableNativeFeedback>
            <TextInput style={styles.input} multiline numberOfLines={4}
                value={text} onChangeText={onChangeText}
            />
            <Text style={styles.textoGrande}>{number}</Text>
            <TextInput style={styles.input} value={number} onChangeText={onChangeNumber}
                placeholder='introduce un número' keyboardType='numeric'
            />
        </View>
    )
}
const ToggleButton = () => {
    const [isEnabled, setIsEnabled] = React.useState(false)

    return (
        <View>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor='#3e3e3e'
                value={isEnabled} onValueChange={() => setIsEnabled(previousState => !previousState)}
            />
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
