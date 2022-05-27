import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PilaScreen from './PilaSrceen';
import TabsScreen from './TabsScreen';

function HomeScreen({ navigation }) {
    return (
        // <View><Text>Hola mundo</Text></View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => navigation.navigate('Notifications')}
                title="Go to notifications"
            />
        </View>
    );
}

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}

const Drawer = createDrawerNavigator();

export default function DrawerScreen() {
    return (
        <Drawer.Navigator initialRouteName="Inicio">
            <Drawer.Screen name="Inicio" component={HomeScreen} />
            <Drawer.Screen name="Notifications" component={NotificationsScreen} />
            <Drawer.Screen name="Configuración" component={PilaScreen} />
            <Drawer.Screen name="Solapas" component={TabsScreen} />
        </Drawer.Navigator>
    );
}