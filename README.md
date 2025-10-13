# 📊 Interactive Statistics Calculator & Practice Platform  

This project is a **two-part educational web app** built for first-year university statistics students. It combines a **step-by-step calculator** with a **practice/testing system**, designed to help learners grasp key statistical concepts interactively.  

---

## 🧮 1. Calculator  

An intuitive interface offering **worked examples and formula visualizations** for:  
- **Basic Probability**  
- **Permutations & Combinations** (with and without repetition)  
- **Bayes’ Theorem**  
- **Conditional Probability & Independence**  
- **Set Theory** (union, intersection, complement, power sets, etc.)  
- **Random Variables** (discrete & continuous — PMF, PDF, expectation & variance)  
- **House Advantage** (bets, odds, expected values, and losses)  

**Additional Features:**  
- Built-in **help buttons** and **example scenarios** for guidance.  
- **MathJax** for smooth formula rendering.  
- **Multiple visual themes**, including:  
  - Blood Red  
  - Spiderman (default)  
  - Red–Blue  
  - Purple–Black  
  - Sapphire & Steel  
  - Forest Canopy, Cat Noir, Retro Pop, and more.  

---

## 🧠 2. Practice & Testing Portal  

A self-assessment system with both **practice** and **exam** modes.  

### 📝 Practice Mode  
- Choose a topic to receive random questions.  
- **Instant feedback** and **step-by-step worked solutions**.  

### 🧾 Test Simulation Mode  
- Generates a random **25-question test**.  
- Includes a **countdown timer** and **result summary**.  
- Full **answer review** with explanations after completion.  

Questions are dynamically loaded from:  
- `questions.json` → Multiple Choice Questions (MCQs)  
- `complex.json` → Open-ended / numerical questions  

---

## ⚙️ 3. Technical Highlights  

- Built with **HTML, CSS, and vanilla JavaScript** (no frameworks).  
- **Theme persistence** using `localStorage`.  
- **MathJax** for LaTeX-style math rendering.  
- **Chart.js** integrated for distribution visualizations.  
- **Modular question structure** → easily add new topics via JSON.  

---

## 🚀 How to Use  

1. **Clone or download** this repository.  
2. Open `index.html` → Calculator interface.  
3. Open `exam.html` → Practice & testing portal.  
4. To **add/edit questions**, update `questions.json` and `complex.json`.  

---

## 🎨 Default Theme  

The current default theme is **Cat Noir** — a sleek black & purple interface designed for late-night study sessions.  

---

## ⚠️ Disclaimer  

This web app is intended for **academic learning and personal practice** only.  
- Some worked solutions may be approximations or simplified explanations.  
- Always verify final answers using trusted course materials.  
- This platform is **not a substitute for formal instruction**.  

---

👨‍💻 **Developed by Moegamat Samsodien**  
*Version 5 — Interactive Stats Calculator*  
