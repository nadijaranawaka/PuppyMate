# 🐾 PuppyMate — Emotion-Driven AI Quote Generator

> Turn a feeling into the perfect quote — in seconds.

PuppyMate generates custom, emotionally-aware quotes based on your inputs. Built for content creators, influencers, and designers who need fresh, on-brand quotes for reels, posters, or merch — without the writer's block.

---

## 🛠️ Technologies

| Layer | Tech |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| AI | OpenAI API |
| Prompting | One-shot Prompt Engineering 

---

## ✨ Features

- **Emotion-based input** — select up to 3 emotions to shape the tone of your quote
- **Custom parameters** — choose description, tone, and point of view
- **One-shot prompting** — a single carefully crafted prompt guides the AI to produce consistent, high-quality output every time
- **Dynamic prompt generation** — user inputs are converted into structured prompts on the fly
- **Real-time AI output** — quotes fetched live via the OpenAI API
- **Clean output popup** — generated quotes displayed in a clear, focused popup
- **Loading overlay** — spinner keeps the user informed while the AI processes
- **Formatted output** — multiple quotes separated by `|` for easy reading and parsing

---

## 👤 What Users Can Do

1. Enter a description of what the quote should be about
2. Select a tone (e.g. motivational, sad, funny)
3. Choose a point of view
4. Pick up to 3 emotions
5. Hit generate and get tailored quotes instantly
6. Copy and use them for reels, t-shirts, posters, or anything creative

---

## 🧠 My Process

1. **Defined the problem** — content creators waste time searching for quotes that match a specific vibe. I wanted to automate that.
2. **Designed the UI** — built the input form with HTML/CSS, focusing on simplicity and usability.
3. **Engineered the prompt** — spent time iterating on a one-shot prompt structure that consistently produces quality output from varied inputs.
4. **Connected the AI** — integrated the OpenAI API using `async/await` to handle real-time responses from the frontend.
5. **Handled the output** — built a popup to display and parse multiple quotes cleanly.
6. **Polished the UX** — added a loading spinner to manage perceived wait time during API calls.

---

## 📚 What I Learned

- **Prompt engineering** — how to structure one-shot prompts to reliably shape AI output
- **API integration** — connecting a frontend to a live AI backend using `fetch` and `async/await`
- **Asynchronous JavaScript** — handling async calls and dynamic data without breaking the UI
- **DOM manipulation** — building and controlling dynamic UI elements like popups and spinners
- **Problem-solving under constraints** — working through API latency and output formatting challenges

---

## 🔮 How It Could Be Improved

- [ ] Save and favourite generated quotes
- [ ] Expand prompt templates for more nuanced styles (poetic, philosophical, etc.)
- [ ] Full mobile responsiveness
- [ ] User accounts to store quote history
- [ ] Export quotes as styled images ready to post

---

## ▶️ How to Run Locally

### Prerequisites
- An [OpenAI API key](https://platform.openai.com/api-keys)
- Node.js installed

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/nadijaranawaka/PuppyMate.git
cd PuppyMate

# 2. Install dependencies
npm install

# 3. Add your OpenAI API key
# Create a .env file in the root and add:
OPENAI_API_KEY=your_api_key_here

# 4. Start the backend server
node model.js

# 5. Open index.html in your browser (or use Live Server)
```

> ⚠️ Never commit your `.env` file. Make sure it's listed in `.gitignore`.

---

## 🎬 Demo

### Landing Page
![Landing Page](/images/Screenshots-Demos/Home%20Background.png)

### Selecting Inputs
![User Inputs](/images/Screenshots-Demos/Selecting%20Inputs.png)

### POV Dropdown
![POV Dropdown](/images/Screenshots-Demos/POV%20dropdown.png)

### Tone Dropdown
![Tone Dropdown](/images/Screenshots-Demos/TONE%20dropdown.png)

### Loading Spinner
![Loading Spinner](/images/Screenshots-Demos/loading%20spinner.png)

### Generated Quotes
![Generated Quotes](/images/Screenshots-Demos/Generated%20Popup.png)

### 📹 Full Demo Video
> [Watch the demo](/images/Screenshots-Demos/demo.gif)

---

*Built by [Nadija Ranawaka](https://github.com/nadijaranawaka) — 1st year AI & Data Science undergrad, Sri Lanka 🇱🇰*
