import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Modal, ScrollView, KeyboardAvoidingView, Platform
} from "react-native";
import { VIBES } from "../utils/vibes";
import { addPin } from "../utils/storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default function AddPinModal({ visible, onClose, onPinAdded, userLocation }) {
  const [selectedVibe, setSelectedVibe] = useState(VIBES[0].label);
  const [note, setNote] = useState("");

  const handleSave = async () => {
    if (!userLocation) return;
    const pin = {
      id: uuidv4(),
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      vibe: selectedVibe,
      note: note.trim(),
      createdAt: Date.now(),
    };
    const updated = await addPin(pin);
    setNote("");
    setSelectedVibe(VIBES[0].label);
    onPinAdded(updated);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>Drop a Pin Here</Text>
          <Text style={styles.sectionLabel}>What's the vibe?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.vibeScroll}>
            {VIBES.map((v) => (
              <TouchableOpacity
                key={v.label}
                onPress={() => setSelectedVibe(v.label)}
                style={[
                  styles.vibePill,
                  { borderColor: v.color },
                  selectedVibe === v.label && { backgroundColor: v.color }
                ]}
              >
                <Text style={styles.vibeEmoji}>{v.emoji}</Text>
                <Text style={[
                  styles.vibeText,
                  { color: selectedVibe === v.label ? "#fff" : v.color }
                ]}>
                  {v.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.sectionLabel}>Add a note (optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="What makes this place special?"
            placeholderTextColor="#bbb"
            value={note}
            onChangeText={setNote}
            multiline
            maxLength={120}
          />

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveText}>Save Pin 📍</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" },
  sheet: {
    backgroundColor: "#fff", borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 36,
  },
  handle: { width: 40, height: 4, backgroundColor: "#ddd", borderRadius: 2, alignSelf: "center", marginBottom: 16 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 20 },
  sectionLabel: { fontSize: 13, fontWeight: "600", color: "#888", marginBottom: 10, textTransform: "uppercase" },
  vibeScroll: { marginBottom: 20 },
  vibePill: {
    flexDirection: "row", alignItems: "center", gap: 6,
    borderWidth: 1.5, borderRadius: 20, paddingHorizontal: 14,
    paddingVertical: 8, marginRight: 8,
  },
  vibeEmoji: { fontSize: 16 },
  vibeText: { fontSize: 13, fontWeight: "600" },
  input: {
    borderWidth: 1, borderColor: "#eee", borderRadius: 12,
    padding: 14, fontSize: 14, color: "#333", minHeight: 80,
    textAlignVertical: "top", marginBottom: 24,
  },
  buttons: { flexDirection: "row", gap: 12 },
  cancelBtn: {
    flex: 1, padding: 14, borderRadius: 14,
    borderWidth: 1, borderColor: "#eee", alignItems: "center",
  },
  cancelText: { fontSize: 15, color: "#888", fontWeight: "600" },
  saveBtn: { flex: 2, padding: 14, borderRadius: 14, backgroundColor: "#4DB6AC", alignItems: "center" },
  saveText: { fontSize: 15, color: "#fff", fontWeight: "700" },
});