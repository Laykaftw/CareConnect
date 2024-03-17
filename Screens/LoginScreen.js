import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { getParentId, resetParent } from './Database';

const LoginScreen = ({ navigation }) => {
    const [user, setuser] = useState('');
    const [pass, setPass] = useState('');
    const [Id, setId] = useState(null);

    const handleId =(selectedId) => {
        if (selectedId) {
            setId(selectedId);
        } else {
            console.error('No Account found for Data.');
        }
    };
    
    const handleLogin = () => {
        if(user === 'Admin' && pass === 'Admin'){
            navigation.navigate('AdminScreen');
        } else {
            getParentId(user, pass, (selectedId) => {
                if (selectedId) {
                    setId(selectedId);
                    console.log(selectedId); // Log the selectedId here
                    navigation.navigate('HomeScreen');
                } else {
                    console.error('No Account found for Data.');
                    alert(`Account Does Not Exist`);
                }
            });
        }
    }
    
    // const handleFilePick = async () => {
    //     try {
    //         DocumentPicker.getDocumentAsync()
    //         setSelectedFile(res);
    //     } catch (err) {
    //         if (DocumentPicker.isCancel(err)) {
    //             // User cancelled the picker
    //             console.log('User cancelled the picker');
    //         } else {
    //             Alert.alert('Error', 'Failed to pick a file');
    //         }
    //     }
    // };


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='User'
                onChangeText={(text) => setuser(text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Password'
                onChangeText={(text) => setPass(text)}
                secureTextEntry={true}
            />
            <Button style={{ width: 200, height: 50, alignContent: 'center' }} buttonColor='#367CFF' textColor='white' onPress={() => handleLogin(user, pass)}>Log in</Button>
            <View style={styles.containers}>
                <Text>You don't have an account! </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}><Text style={styles.link}>Create an account</Text></TouchableOpacity>
            </View>
            <Button onPress={resetParent}>Reset</Button>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containers: {
        justifyContent: 'center',
        height: 40,
        margin: 20,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    loginForm: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        marginBottom: 10,
    },
    signupForm: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue',
        alignItems: 'center',
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#367CFF',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        width:300,
    },
    link: {
        fontWeight:'bold',
        color:'red',
    },
});