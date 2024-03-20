import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { SelectList } from 'react-native-dropdown-select-list'
import * as DocumentPicker from 'expo-document-picker';
import { addParent } from '../Components/Database';

const SignUpScreen = ({ navigation }) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const data = ['Parent', 'Babysitter'];

    const handleSignUp = () => {
        if (user === '') {
            alert('Please enter a user name');
        } else if (phone === '') {
            alert('Please enter a phone number');
        } else if (pass === '') {
            alert('Please enter a password');
        } else if (selectedRole === '') {
            alert('Please select a role');
        } 
        // else if (pass !== confirmPass) {
        //     alert('Passwords do not match');
        // } 
        else if (user === 'Admin' && pass === 'Admin') {
            alert('You are not allowed to use this username and password');
        } else {
            if (selectedRole === 'Parent') {
                addParent(user, phone, pass);
                navigation.navigate('Login');
            } else {
                // navigation.navigate('BabysitterSignUp');
            }
        }
    }

    const handleFileUpload = async () => {
        const file = await DocumentPicker.getDocumentAsync({});
        console.log(file);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <TextInput
                    style={styles.input}
                    placeholder='User Name'
                    onChangeText={(text) => setUser(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    onChangeText={(text) => setPass(text)}
                    secureTextEntry={true}
                />
                {/* <TextInput
                    style={styles.input}
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPass(text)}
                    secureTextEntry={true}
                /> */}
                <TextInput
                    style={styles.input}
                    placeholder='Phone'
                    onChangeText={(text) => setPhone(text)}
                    keyboardType='phone-pad'
                />
                <SelectList
                    data={data}
                    setSelected={item => setSelectedRole(item)}
                    boxStyles={{ margin: 20, padding: 10, borderColor: '#367CFF', borderRadius: 15, alignItems: 'center' }}
                    dropdownStyles={{ borderColor: '#367CFF' }}
                />
                {selectedRole === 'Babysitter' && (
                    <View style={styles.container}>
                        <Text>To ensure security you have to upload your resume and experiences</Text>
                        <Button
                            style={{ width: 200, height: 50, alignContent: 'center' }}
                            buttonColor='#367CFF'
                            textColor='white'
                            onPress={handleFileUpload}
                        >Upload</Button>
                    </View>
                )}
                <Button
                    style={{ width: 200, height: 50, alignContent: 'center' }}
                    buttonColor='#367CFF'
                    textColor='white'
                    onPress={handleSignUp}
                >Sign Up</Button>

                <View style={styles.containers}>
                    <Text>You already have an account! </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={styles.link}>Sign In</Text></TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default SignUpScreen

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
        width: 300,
    },
    link: {
        fontWeight: 'bold',
        color: 'red',
    },
});
