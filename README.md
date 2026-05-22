# 🗺️ Local Mood Map

> Drop pins on a map and tag places with a vibe — chill, energetic, romantic, eerie, and more.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

📱 About

Local Mood Map is a mobile app that lets you capture the emotional atmosphere of places you visit. Whether it's a chill coffee shop, an eerie alleyway, or a romantic sunset spot — drop a pin, pick a vibe, and build your personal mood map of the world.

---

 ✨ Features

- 🗺️ **Interactive Map** — view all your pinned locations on a live map
- 📍 **Drop Pins** — save your current location with one tap
- 🎨 **Vibe Tagging** — choose from 8 mood tags (Chill, Energetic, Romantic, Eerie, Peaceful, Nostalgic, Hype, Mysterious)
- 🎨 **Color-coded Markers** — each vibe has a unique color and emoji on the map
- 📋 **My Pins List** — browse all your saved places in a clean list view
- 📊 **Profile & Stats** — see your total pins, top vibe, and a breakdown bar chart
- 📝 **Notes** — add a short note to remember what made a place special
- 💾 **Offline Storage** — all data saved locally on your device, no account needed

---

 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native + Expo |
| Navigation | React Navigation (Bottom Tabs + Native Stack) |
| Maps | react-native-maps |
| Location | expo-location |
| Storage | AsyncStorage |
| Unique IDs | uuid + react-native-get-random-values |

---

## 📂 Project Structure

```
LocalMoodMap/
├── app/
│   ├── screens/
│   │   ├── MapScreen.js        # Main map with pin markers
│   │   ├── MyPinsScreen.js     # List of all saved pins
│   │   └── ProfileScreen.js    # Stats and vibe breakdown
│   ├── components/
│   │   ├── AddPinModal.js      # Bottom sheet to create a pin
│   │   └── PinCard.js          # Individual pin list item
│   ├── utils/
│   │   ├── storage.js          # AsyncStorage CRUD helpers
│   │   └── vibes.js            # Vibe definitions (label, emoji, color)
│   └── navigation/
│       └── AppNavigator.js     # Bottom tab navigator setup
└── App.js                      # Entry point
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Expo Go](https://expo.dev/client) app on your phone

Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/LocalMoodMap.git
   cd LocalMoodMap
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start --clear
   ```

4. Scan the QR code with **Expo Go** on your phone.

---

## 🎨 Vibe Reference

| Vibe | Emoji | Color |
|------|-------|-------|
| Chill | 😌 | Teal |
| Energetic | ⚡ | Amber |
| Romantic | 🌹 | Pink |
| Eerie | 👻 | Purple |
| Peaceful | 🍃 | Green |
| Nostalgic | 🎞️ | Brown |
| Hype | 🔥 | Orange |
| Mysterious | 🌫️ | Slate |

---

🔮 Future Features

- [ ] Share a pin as a deep link
- [ ] Filter pins by vibe on the map
- [ ] Photo attachment to a pin
- [ ] Export your mood map as an image
- [ ] Cloud sync across devices

---

 👨‍💻 Author

Built Ngonidzashe Chamboko as a portfolio project.

---

 📄 License

This project is open source and available under the [MIT License](LICENSE).
