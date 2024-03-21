import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import * as DocumentPicker from "expo-document-picker";
import { addParent } from "../Components/Database";

const SignUpScreen = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const data = ["Parent", "Babysitter"];

  const handleSignUp = () => {
    if (user === "") {
      alert("Please enter a user name");
    } else if (phone === "") {
      alert("Please enter a phone number");
    } else if (pass === "") {
      alert("Please enter a password");
    } else if (selectedRole === "") {
      alert("Please select a role");
    }
    // else if (pass !== confirmPass) {
    //     alert('Passwords do not match');
    // }
    else if (user === "Admin" && pass === "Admin") {
      alert("You are not allowed to use this username and password");
    } else {
      if (selectedRole === "Parent") {
        addParent(user, phone, pass);
        navigation.navigate("Login");
      } else {
        // navigation.navigate('BabysitterSignUp');
      }
    }
  };

  const handleFileUpload = async () => {
    const file = await DocumentPicker.getDocumentAsync({});
    console.log(file);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="User Name"
          onChangeText={(text) => setUser(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
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
          placeholder="Phone"
          onChangeText={(text) => setPhone(text)}
          keyboardType="phone-pad"
        />
        <SelectList
          data={data}
          setSelected={(item) => setSelectedRole(item)}
          boxStyles={{
            margin: 20,
            padding: 10,
            borderColor: "#367CFF",
            borderRadius: 15,
            alignItems: "center",
          }}
          dropdownStyles={{ borderColor: "#367CFF" }}
        />
        {selectedRole === "Babysitter" && (
          <View style={styles.container}>
            <Text>
              To ensure security you have to upload your resume and experiences
            </Text>
            <Button
              style={{
                width: 200,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
              buttonColor="#6750a4"
              textColor="white"
              onPress={handleFileUpload}
            >
              Upload
            </Button>
          </View>
        )}
        <Button
          style={{
            width: 200,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
          buttonColor="#6750a4"
          textColor="white"
          onPress={handleSignUp}
        >
          Sign Up
        </Button>

        <View style={styles.containers}>
          <Text>You already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Sign In!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  containers: {
    justifyContent: "center !important",
    height: 40,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
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
