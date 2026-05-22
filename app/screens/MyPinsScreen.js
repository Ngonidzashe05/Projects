import React, { useState, useCallback } from "react";
import { View, FlatList, Text, StyleSheet, SafeAreaView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { loadPins } from "../utils/storage";
import PinCard from "../components/PinCard";

export default function MyPinsScreen() {
  const [pins, setPins] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadPins().then(setPins);
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Pins</Text>
      {pins.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>📍</Text>
          <Text style={styles.emptyText}>No pins yet. Go add one on the map!</Text>
        </View>
      ) : (
        <FlatList
          data={pins}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PinCard pin={item} />}
          contentContainerStyle={{ padding: 16, gap: 12 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  header: { fontSize: 24, fontWeight: "700", padding: 20, paddingBottom: 8 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center", gap: 12 },
  emptyEmoji: { fontSize: 48 },
  emptyText: { fontSize: 16, color: "#888", textAlign: "center" },
});