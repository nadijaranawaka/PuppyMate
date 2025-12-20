# PuppyMate

Project Type: Full-Stack Web Application
Technologies: HTML, CSS, JavaScript, AI (OpenAI API), Prompt Engineering (One-shot prompting)

# Project Overview

PuppyMate generates custom, emotionally-aware quotes based on user inputs: description, tone, point of view, and up to 3 emotions. The webapp uses one-shot prompting to craft AI prompts that produce consistent, high-quality quotes. It demonstrates API integration, prompt engineering, and full-stack problem-solving. The user can convert his/her idea into a quote in few clicks

# Features

One-shot prompting: Uses a single carefully crafted prompt to guide AI output for each request.
Dynamic prompt generation: Converts user inputs into structured prompts for context-aware results.
API integration: Fetches quotes in real time from AI backend.
Output handling: Designed a popup to display generated quotes, giving users a clear view of results.
Loading overlay: Spinner indicates processing while generating quotes.
Formatted output: Multiple quotes are separated by | for easy parsing.

# Challenges & Solutions

Connecting AI model with website script: Integrating the frontend with the AI backend was tricky due to asynchronous calls and dynamic data handling. Solved by careful async/await implementation and event-driven design, which ensured reliable output.
Building the output popup: Learned DOM manipulation and event handling to display dynamic AI output cleanly.
Prompt design: Iterated on one-shot prompts to get consistent, context-aware results.
API latency: Added loading spinner overlay to improve perceived performance.
Output readability: Used | separator to make multiple quotes easy to parse.

# Learning Outcomes

Hands-on experience in full-stack development, integrating frontend and AI backend.
Developed skills in one-shot prompting and controlling AI output.
Improved problem-solving and asynchronous programming skills for dynamic web applications.

# Future Improvements

Expand prompt templates for more nuanced quote styles.
Add save favorite quotes functionality.
Improve UI/UX and mobile responsiveness.
Responsive design to make it accessible through any device

# Screenshots / Demo

Landing page:  
![Landing Page](/images/Screenshots-Demos/Home%20Background.png)

POV Dropdown:
![Pov Dropdown](/images/Screenshots-Demos/POV%20dropdown.png)

TONE dropdown:
![Tone Dropdown](/images/Screenshots-Demos/TONE%20dropdown.png)

User Inputs
![User Inputs](/images/Screenshots-Demos/Selecting%20Inputs.png)

Loading Spinner
![Loading Spinner](/images/Screenshots-Demos/loading%20spinner.png)

Generated quotes example:  
![Generated Quotes](/images/Screenshots-Demos/Generated%20Popup.png)

Demo Video
![Demo](/images/Screenshots-Demos/demo.mp4)
