import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet, Text, View, Button, ScrollView, FlatList, SectionList, Image, ActivityIndicator,
    TextInput, KeyboardAvoidingView, Platform, Keyboard, Switch, Modal, Share, Vibration,
    TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback,
} from 'react-native';
import Calculadora from '../components/calculadora';
import { ContactosDetails, ContactosList } from '../components/demos';

const Stack = createNativeStackNavigator();

function LogoTitle(props) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, }}>
            <Image style={{ width: 50, height: 50 }} source={require('../assets/favicon.png')} />
            <Text style={{ flex: 1, marginStart: 5 }}>{props.children}</Text>
        </View>
    )
}


function Home({ navigation, route, state }) {
    return (
        <View>
            <Button title="Go Settings" onPress={() => navigation.push('Settings')} />
            <Button title="Calculadora" onPress={() => navigation.push('Calculadora')} />
            <Button title="Contactos" onPress={() => navigation.push('Contactos')} />
        </View>
    )
}

function Settings({ navigation, route, state }) {
    return (
        <View>
            <Button title="Go Details" onPress={() => navigation.push('Details')} />
        </View>
    )
}
function Details({ navigation, route, state }) {
    return (
        <View>
            <Button title="Go back" onPress={() => navigation.goBack()} />
            <Button title="Go first" onPress={() => navigation.popToTop()} />
        </View>
    )
}
export default function PilaScreen() {
    return (
        <Stack.Navigator initialRouteName="Home"
            screenOptions={{ headerMode: 'screen', headerTintColor: 'white', headerStyle: { backgroundColor: 'tomato' }, }}     >
            <Stack.Screen name="Home" component={Home} options={{
                title: 'Main',
                headerTitle: props => <LogoTitle {...props} />,
                headerRight: () => (
                    <Button title='Info' color='blue' onPress={() => alert('This is a button!')} />
                ),
            }} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Calculadora" component={Calculadora} />
            <Stack.Screen name="Contactos" component={ContactosList} />
            <Stack.Screen name="Contacto" component={ContactosDetails} />
        </Stack.Navigator>
    )
}