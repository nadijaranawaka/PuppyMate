//Initializing vairables
const form = document.getElementById("Aimodel1");
const generate = document.querySelector(".generate-butn");
const descrip = document.getElementById ("desc-text");
const pov = document.getElementById("pov");
const tone = document.getElementById("tone");
const emotionButtons = document.querySelectorAll(".emotion-buttons button");
const popup = document.querySelector(".output-popup");
const popupClose = document.querySelector(".close");
const popupOutput = document.querySelector(".output");
const generateagain = document.getElementById("generateagain");
let data = null
let outputs = []

//emotion buttons
let selectedButtons = new Set();

const color = [
  "#6CA6CD", // SAD 😢  → soft steel blue, calm and easy on eyes
  "#FFB84C", // HAPPY 😍 → warm amber-yellow, cheerful but not neon
  "#B0B0B0", // LONELY 😶‍🌫️ → neutral gray, fits minimal theme
  "#00BFA6", // CONFIDENT 😎 → teal-green, modern & bold
  "#E85A5A", // ANGRY 😡 → soft red, energetic but not aggressive
  "#AED9C5", // PEACEFUL 🌸 → pastel mint, calm contrast
  "#E2B75B", // GRATEFUL 😌 → golden sand tone, warm & soft
  "#C26666", // HEART-BROKEN 💔 → muted rose-red
  "#A67FCB", // INSPIRED ✨ → lavender purple, creative energy
  "#8896A5", // LOST 😕 → soft slate gray
  "#6BCB77", // MOTIVATED 💪 → green with optimism
  "#5DADE2", // ANXIOUS 🌀 → sky blue, gentle contrast
  "#F78FB3", // ROMANTIC 🌹 → blush pink, warm and welcoming
  "#89CFF0", // HOPEFUL 🌈 → baby blue, airy and light
  "#B57A84", // BETRAYED 🥀 → dusty rose, emotional but soft
  "#9B59B6", // SAVAGE 😈 → medium purple, fierce yet elegant
  "#FF9F68", // PLAYFUL 🐾 → peach-orange, cheerful but readable
  "#A8A8A8", // REGRETFUL ⏳ → gray tone, reflective neutral
  "#F4C430", // FOCUSED 🎯 → golden yellow, sharp but not harsh
  "#8E44AD"  // EMPOWERED 👑 → royal purple, authority without glare
];


emotionButtons.forEach((emotionButtons,index) => {
    emotionButtons.addEventListener("click",() => {
        if (selectedButtons.has(emotionButtons)){
            emotionButtons.style.color = "#222"
            emotionButtons.style.borderColor = "#222"
            selectedButtons.delete(emotionButtons);
            emotionButtons.classList.remove("selected")
        } else {
            if (selectedButtons.size < 3) {
                emotionButtons.style.color = color[index]
                emotionButtons.style.borderColor = color[index]
                selectedButtons.add(emotionButtons);
                emotionButtons.classList.add("selected");
            } else {
                alert("You can only select 3 buttons at a time!")
            }
        }
    })
    })


// form submission
form.addEventListener("submit",async(e) => {
    e.preventDefault();

    //1.Text area
    const textvalue = descrip.value;

    //2.POV
    const povvalue = pov.value;

    //3.TONE
    const tonevalue = tone.value

    //4. Buttons
    const selectedButtonsValues = Array.from(selectedButtons).map(emotionButtons => emotionButtons.textContent);

    //5.Length
    const selectedlength = document.querySelector("input[name = 'length']:checked");
    const lengthvalue = selectedlength ? selectedlength.value : "none selected";

    //store temp
    const userinputs = {
        description: textvalue,
        pov: povvalue,
        tone: tonevalue,
        emotions: selectedButtonsValues,
        length: lengthvalue
    };

    //send to backend
    const response = await fetch("http://localhost:3000/generate",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(userinputs)
    });

    data = await response.json();
    console.log(data.output);
    outputs = data.output.split("|")
    renderoutput(outputs)

});

//output popup
let outputcontainer = document.getElementById("output")

//refreses the output container
function renderoutput(output){
    outputcontainer.innerHTML = "<button id='generateagain'>Generate Again</button>";

    output.forEach(item => {
        const p = document.createElement("p")
        p.classList.add("row")
        p.innerHTML = `
            <img src="images/logo2.jpg" alt="Cute puppy logo" width="30" height="30">
            <span class="outputText">"${item}"</span>  
            <button class="copy"><span class="emotionlist">[emotions selected by the user]</span><i class="fa fa-clone fa-2x" aria-hidden="true"></i></button>`;

        // console.log(outputcontainer, document.getElementById("generateagain"))
        outputcontainer.insertBefore(p, document.getElementById("generateagain"))

        //Add divider line
        const hr = document.createElement("hr");
        outputcontainer.insertBefore(hr, document.getElementById("generateagain"))
        });

};  

// renderoutput()
document.addEventListener("click",e => {
    if (e.target.id === "generateagain") {
        renderoutput(outputs)
    }
});

//Copying output
document.addEventListener("click",function(e){
    const btn = e.target.closest(".copy");
    if (!btn) return

    const row = e.target.closest("p");
    const output = row.querySelector(".outputText").innerText;

    navigator.clipboard.writeText(output)
        .then(() => {
            const originalhtml = btn.innerHTML
            btn.innerHTML = 'Copied!';
            setTimeout(() => {
                btn.innerHTML = originalhtml;
            },900);
        })
        .catch(err => console.error("Copy failed",err));
    });