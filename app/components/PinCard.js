import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getVibe } from "../utils/vibes";

export default function PinCard({ pin }) {
  const vibe = getVibe(pin.vibe);
  const date = new Date(pin.createdAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric"
  });

  return (
    <View style={[styles.card, { borderLeftColor: vibe.color }]}>
      <View style={styles.row}>
        <View style={[styles.badge, { backgroundColor: vibe.color + "22" }]}>
          <Text style={styles.emoji}>{vibe.emoji}</Text>
          <Text style={[styles.vibeLabel, { color: vibe.color }]}>{vibe.label}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
      {pin.note ? <Text style={styles.note}>{pin.note}</Text> : null}
      <Text style={styles.coords}>
        {pin.latitude.toFixed(4)}, {pin.longitude.toFixed(4)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff", borderRadius: 14,
    padding: 16, borderLeftWidth: 5,
    shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 6,
  },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  badge: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  emoji: { fontSize: 16 },
  vibeLabel: { fontWeight: "600", fontSize: 13 },
  date: { fontSize: 12, color: "#aaa" },
  note: { fontSize: 14, color: "#444", marginBottom: 6 },
  coords: { fontSize: 11, color: "#bbb" },
});