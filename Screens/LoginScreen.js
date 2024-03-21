import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { getParentId, resetParent } from "../Components/Database";

const LoginScreen = ({ navigation }) => {
    const [user, setuser] = useState("");
    const [pass, setPass] = useState("");
    const [Id, setId] = useState(null);

    const handleLogin = () => {
        if (user === "Admin" && pass === "Admin") {
            navigation.navigate("AdminScreen");
        } else {
            getParentId(user, pass, (selectedId) => {
                if (selectedId) {
                    setId(selectedId);
                    console.log(selectedId); // Log the selectedId here
                    navigation.navigate("HomeScreen");
                } else {
                    console.error("No Account found for Data.");
                    alert(`Account Does Not Exist`);
                }
            });
        }
    };

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
                mode="outlined"
                style={styles.input}
                placeholder="User"
                onChangeText={(text) => setuser(text)}
            />
            <TextInput
                mode="outlined"
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => setPass(text)}
                secureTextEntry={true}
            />
            <Button
                style={{
                    width: 200,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                buttonColor="#6750a4"
                textColor="white"
                onPress={() => handleLogin(user, pass)}
            >
                Log in
            </Button>
            <View style={styles.containers}>
                <Text>Don't Have An Account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text style={styles.link}>Sign Up!</Text>
                </TouchableOpacity>
            </View>
            <Button onPress={resetParent}>Reset</Button>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    containers: {
        justifyContent: "center",
        height: 40,
        margin: 20,
        justifyContent: "space-evenly",
        flexDirection: "row",
    },

    signupForm: {
        borderWidth: 1,
        borderColor: "black",
        padding: 10,
        marginBottom: 10,
    },

    input: {
        margin: 15,
        height: 40,
        borderColor: "#367CFF",
        padding: 10,
        width: 300,
        backgroundColor: "#fff",
        color: "#000",
    },

    link: {
        fontWeight: "bold",
    },
});
