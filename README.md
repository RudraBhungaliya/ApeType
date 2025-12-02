ApeType 

---

ApeType is a clean, ultra-responsive typing test built with React.  
It recreates the fluid feel of Monkeytype: instant line shifts, perfect caret tracking, and a distraction-free UI focused entirely on speed.

---

## ⭐ Features

- ⚡ **Instant line transitions** 
- 🎯 **Accurate blinking caret**, placed exactly where you’re typing
- 🔤 **Correct / incorrect character coloring**
- 🧵 **3-line viewport layout** identical to Monkeytype
- 📏 **Smart word spacing** using proportional `ch` units
- 🔄 **Automatic text fetching** from BaconIpsum API
- 🖥 **Centered, readable layout**
- 🧹 **Clean furbish engine** to sanitize text input

---

Clone the repo:
git clone https://github.com/RudraBhungaliya/ApeType

---

## 🧪 How It Works

### ✏ Text Engine
- Fetches paragraphs from **BaconIpsum API**
- Cleans them using a custom **furbish()** sanitization function
- Splits the text into consistent **7-word lines**
- Only **3 lines are shown** at a time (active line + 2 previews)

### ⌨ Typing Logic
- The **top line** is always the active, typeable line
- When the line is completed → it **instantly shifts upward**
- The caret is placed based on the **absolute character index**
- Incorrect characters turn **red** immediately

---

##  Inspiration
ApeType draws inspiration from:
- **Monkeytype** 🐒 — fast, clean typing experience  

---

## 👨‍💻 Author
Built by **Rudra**  
GitHub: **https://github.com/RudraBhungaliya**


