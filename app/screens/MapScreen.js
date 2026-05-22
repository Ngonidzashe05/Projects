import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { loadPins, deletePin } from "../utils/storage";
import { getVibe } from "../utils/vibes";
import AddPinModal from "../components/AddPinModal";

export default function MapScreen() {
  const [pins, setPins] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    fetchLocation();
    fetchPins();
  }, []);

  const fetchLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Location access is needed to place pins.");
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    setUserLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  };

  const fetchPins = async () => {
    const saved = await loadPins();
    setPins(saved);
  };

  const handlePinAdded = (newPins) => {
    setPins(newPins);
    setModalVisible(false);
  };

  const handleDeletePin = async (id) => {
    Alert.alert("Delete pin", "Remove this pin?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete", style: "destructive",
        onPress: async () => {
          const updated = await deletePin(id);
          setPins(updated);
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={userLocation}
        showsUserLocation={true}
      >
        {pins.map((pin) => {
          const vibe = getVibe(pin.vibe);
          return (
            <Marker
              key={pin.id}
              coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
              onCalloutPress={() => handleDeletePin(pin.id)}
            >
              <View style={[styles.marker, { backgroundColor: vibe.color }]}>
                <Text style={styles.markerEmoji}>{vibe.emoji}</Text>
              </View>
            </Marker>
          );
        })}
      </MapView>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Pin</Text>
      </TouchableOpacity>

      <AddPinModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onPinAdded={handlePinAdded}
        userLocation={userLocation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  marker: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: "center", alignItems: "center",
    borderWidth: 2, borderColor: "#fff",
    shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 4,
  },
  markerEmoji: { fontSize: 18 },
  addButton: {
    position: "absolute", bottom: 30, alignSelf: "center",
    backgroundColor: "#4DB6AC", paddingHorizontal: 28,
    paddingVertical: 14, borderRadius: 30,
    shadowColor: "#000", shadowOpacity: 0.25, shadowRadius: 6,
  },
  addButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});