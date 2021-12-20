import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ImageBackground,
} from "react-native";

export default function AddScreen({ navigation }) {
  const [text, setText] = useState("");

  return (
    <View style={[styles.container, { backgroundColor: "white" }]}> 
        <ImageBackground 
        source={require('../assets/052.jpg')}
        style={styles.background}>  
      <Text 
        style={{ 
            fontSize: 24, 
            fontWeight: 'bold',
            color: 'cyan',
            textShadowOffset: {width: 2, height: 2},
            textShadowRadius: 10,
            textShadowColor: 'green',
        }}
        >Add your to-do item here!</Text>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={(input) => setText(input)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Notes", { text })}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Dismiss</Text>
        </TouchableOpacity>
      </View> 

      <Text style={{ marginTop: 40, color: "white" }}>
          This is what you typed:
        </Text>
        <Text style={{ color: "#333", marginTop: 10 }}>{text}</Text>
               
        </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    fontSize: 18,
    borderColor: "cyan",
    borderWidth: 2,
    fontWeight: 'bold',
    color: 'cyan',
    width: "80%",
    textShadowOffset: {width: -2, height: -2},
    textShadowRadius: 6,
    textShadowColor: 'yellow',
    padding: 10,
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "yellow",
    borderRadius: 5,
    margin: 10,
    marginTop: 30,
    width: 80,
  },
  buttonText: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  background: {
    width: "100%",
    height:  "100%",
    alignItems: "center",
    justifyContent: "center", 
  }
});