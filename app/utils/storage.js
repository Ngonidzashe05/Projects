import AsyncStorage from "@react-native-async-storage/async-storage";

const PINS_KEY = "mood_map_pins";

export const savePins = async (pins) => {
  await AsyncStorage.setItem(PINS_KEY, JSON.stringify(pins));
};

export const loadPins = async () => {
  const data = await AsyncStorage.getItem(PINS_KEY);
  return data ? JSON.parse(data) : [];
};

export const addPin = async (pin) => {
  const pins = await loadPins();
  const updated = [pin, ...pins];
  await savePins(updated);
  return updated;
};

export const deletePin = async (id) => {
  const pins = await loadPins();
  const updated = pins.filter(p => p.id !== id);
  await savePins(updated);
  return updated;
};