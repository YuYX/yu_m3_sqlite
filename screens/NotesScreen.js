import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import * as SQLite from "expo-sqlite";  

const db = SQLite.openDatabase("notes.db"); 

export default function NotesScreen({ navigation, route }) {
  const [notes, setNotes] = useState([]);

  function refreshNotes() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM notes",
        null,
        (txObj, { rows: { _array } }) => setNotes(_array),
        (txObj, error) => console.log(`Error: ${error}`)
      );
    });
  }

  // create database table.
  useEffect(() => {

    db.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS notes
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT, done INT)`
        );
      },
      null,
      refreshNotes
    );
  }, []);

  // add top right button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote}>
          <Ionicons
            name="ios-create-outline"
            size={30}
            color="black"
            style={{
              color: "#f55",
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      ),
    });
  });

  // Monitor route.params for changes and add items to the database
  useEffect(() => {
    if (route.params?.text) {
      db.transaction(
        (tx) => {
          tx.executeSql("INSERT INTO notes (done, title) VALUES (0, ?)", [
            route.params.text,
          ]);
        },
        null,
        refreshNotes
      );
    }
  }, [route.params?.text]);

  function addNote() {
    navigation.navigate("Add Screen");
  }

  // delete an individual note by id
  function deleteNote(id) {
    console.log("Deleting " + id);
    db.transaction(
      (tx) => {
        tx.executeSql(`DELETE FROM notes WHERE id=${id}`);
      },
      null,
      refreshNotes
    );
  }

  // The function to render each row in our FlatList
  function renderItem({ item }) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{fontSize: 12, color: 'red'}}>{item.title}</Text>
        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Ionicons name="trash" size={16} color="#944" />
        </TouchableOpacity>
      </View>
    );
  }
 
  const image = {url: "https://picsum.photos/200/300/"};
  return (
    <View style={styles.container}> 
      <FlatList
        data={notes}
        renderItem={renderItem}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
      />   
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
});