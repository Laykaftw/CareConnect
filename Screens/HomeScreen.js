import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-paper'

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.parent}>
                <TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.navigate('Login')}>
                    <Icon source='account-supervisor-circle' name="parent" size={250} color="#fff"/>
                    <Text style={styles.label}>Parent Space</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.babysitter}>
                <TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.navigate('Login')}>
                    <Icon source='human-baby-changing-table' name="parent" size={250} color="#fff" />
                    <Text style={styles.label}>Babysitter Space</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#grey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    parent: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 20,
        marginTop: 10,
        margin: 10,
        height: 350,
        backgroundColor: '#c2add9',
        borderRadius: 30,
        width:'90%'
    },
    babysitter: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 20,
        margin: 10,
        height: 350,
        backgroundColor: '#80c2b8',
        borderRadius: 30,
        width:'90%',
    },
    touchableOpacity: {
        alignItems: 'center',
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})