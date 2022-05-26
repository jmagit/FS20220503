import {StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerFluid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'deepskyblue',
        color: 'red',
        fontWeight: 'bold',
        padding: 5,
        borderWidth: 3,
        margin: 25,
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    texto: {
        fontSize: 48,
    },
    negrita: {
        fontWeight: 'bold',
    },
    cursiva: {
        fontStyle: 'italic'
    },
    error: {
        color: 'white',
        backgroundColor: 'red',
        fontSize: 32,
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24
    }
});

export default styles