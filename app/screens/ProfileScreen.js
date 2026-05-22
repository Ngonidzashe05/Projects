import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { loadPins } from "../utils/storage";
import { VIBES } from "../utils/vibes";

export default function ProfileScreen() {
  const [pins, setPins] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadPins().then(setPins);
    }, [])
  );

  const vibeCounts = VIBES.map((v) => ({
    ...v,
    count: pins.filter((p) => p.vibe === v.label).length,
  })).sort((a, b) => b.count - a.count);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Your Mood Map</Text>

        <View style={styles.statRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{pins.length}</Text>
            <Text style={styles.statLabel}>Total Pins</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>
              {vibeCounts[0]?.count > 0 ? vibeCounts[0].emoji : "—"}
            </Text>
            <Text style={styles.statLabel}>Top Vibe</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Vibe Breakdown</Text>
        {vibeCounts.map((v) => (
          <View key={v.label} style={styles.vibeRow}>
            <Text style={styles.vibeEmoji}>{v.emoji}</Text>
            <Text style={styles.vibeLabel}>{v.label}</Text>
            <View style={styles.barTrack}>
              <View style={[styles.bar, {
                width: `${pins.length ? (v.count / pins.length) * 100 : 0}%`,
                backgroundColor: v.color
              }]} />
            </View>
            <Text style={styles.vibeCount}>{v.count}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  content: { padding: 20 },
  header: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  statRow: { flexDirection: "row", gap: 12, marginBottom: 28 },
  statBox: {
    flex: 1, backgroundColor: "#fff", borderRadius: 16,
    padding: 20, alignItems: "center",
    shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 6,
  },
  statNum: { fontSize: 36, fontWeight: "800" },
  statLabel: { fontSize: 13, color: "#888", marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 14 },
  vibeRow: { flexDirection: "row", alignItems: "center", marginBottom: 12, gap: 8 },
  vibeEmoji: { fontSize: 20, width: 28 },
  vibeLabel: { width: 80, fontSize: 13, color: "#444" },
  barTrack: { flex: 1, height: 10, backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" },
  bar: { height: 10, borderRadius: 5 },
  vibeCount: { width: 20, fontSize: 13, color: "#888", textAlign: "right" },
});