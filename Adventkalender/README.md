# Adventkalender App 🎄

Eine wunderschöne digitale Adventkalender-App für deine Liebste!

## Features ✨

- **24 Türchen** - Klassischer Adventkalender vom 1. bis 24. Dezember
- **Tagesbasierte Freischaltung** - Türchen öffnen sich nur am entsprechenden Tag
- **Schöne Animationen** - Schneeflocken, Glüheffekte und sanfte Übergänge
- **PWA-fähig** - Kann wie eine native App auf dem iPhone installiert werden
- **Personalisierte Nachrichten** - Jedes Türchen enthält eine liebevolle Nachricht
- **Responsive Design** - Funktioniert perfekt auf allen Geräten

## Installation auf dem iPhone 📱

1. **Safari öffnen** und zur App-URL navigieren
2. **Teilen-Button** (Quadrat mit Pfeil) antippen
3. **"Zum Home-Bildschirm"** auswählen
4. **"Hinzufügen"** bestätigen

Die App erscheint dann wie eine normale App auf dem Home-Bildschirm!

## Nachrichten anpassen 💝

Die Nachrichten für jedes Türchen findest du in der Datei `script.js` im `adventMessages` Objekt:

```javascript
const adventMessages = {
    1: "Deine Nachricht für den 1. Dezember...",
    2: "Deine Nachricht für den 2. Dezember...",
    // ... usw.
};
```

## Lokales Testen 🧪

1. Alle Dateien in einen Ordner legen
2. Einen lokalen Server starten:
   ```
   python -m http.server 8000
   ```
   oder
   ```
   npx serve .
   ```
3. Im Browser öffnen: `http://localhost:8000`

## Hosting-Optionen 🌐

- **GitHub Pages** (kostenlos)
- **Netlify** (kostenlos)
- **Vercel** (kostenlos)
- **Firebase Hosting** (kostenlos)

## Technische Details 🔧

- Reine HTML/CSS/JavaScript - keine Frameworks nötig
- Progressive Web App (PWA) mit Service Worker
- Offline-fähig nach dem ersten Laden
- Responsive Design für alle Bildschirmgrößen
- Animations mit CSS3

## Dateien 📁

- `index.html` - Haupt-HTML-Datei
- `style.css` - Alle Styles und Animationen
- `script.js` - JavaScript Logik und Nachrichten
- `manifest.json` - PWA Manifest für App-Installation
- `sw.js` - Service Worker für Offline-Funktionalität

Viel Spaß beim Verschenken! 🎁❤️