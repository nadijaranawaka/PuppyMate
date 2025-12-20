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
const blurback = document.querySelector(".overlay")
const spinner = document.querySelector(".spinner")
const formcontent = document.querySelector(".form-content")
let data = null
let outputs = []
let outputcontainer = document.getElementById("output")
let lastuserinputs = null

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

function renderoutput(output){
    //This function renders the output into the output popup
    outputcontainer.innerHTML = "<button id='generateagain'>Generate Again</button>";

    output.forEach(item => {
        const p = document.createElement("p")
        p.classList.add("row")
        p.innerHTML = `
            <img src="images/logo2.jpg" alt="Cute puppy logo" width="30" height="30">
            <span class="outputText">"${item}"</span>  
            <button class="copy"><span class="emotionlist"></span><i class="fa fa-clone fa-2x" aria-hidden="true"></i></button>`;

        // console.log(outputcontainer, document.getElementById("generateagain"))
        outputcontainer.insertBefore(p, document.getElementById("generateagain"))

        //Add divider line
        const hr = document.createElement("hr");
        outputcontainer.insertBefore(hr, document.getElementById("generateagain"))
        });

}; 

async function generateoutput(e) {
    //This function takes converse with the API
    if (e) e.preventDefault();
    spinner.classList.add("show")
    formcontent.style.display = "none"

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

    const hasNewInput = textvalue || povvalue || tonevalue || selectedButtonsValues.length;
    //store temp
    const userinputs = hasNewInput ? {
        description: textvalue,
        pov: povvalue,
        tone: tonevalue,
        emotions: selectedButtonsValues,
        length: lengthvalue
    }:lastuserinputs;

    lastuserinputs = userinputs
    console.log(lastuserinputs)

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

    popup.classList.add("show")
    blurback.classList.add("show")

};

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
form.addEventListener("submit", generateoutput,);
outputcontainer.addEventListener("click", function(e){
    if (e.target.id === "generateagain") {
        generateoutput();
    }
});
//closing the output
popupClose.addEventListener("click",() => {
    popup.classList.remove("show")
    blurback.classList.remove("show")
    spinner.classList.remove("show")
    formcontent.style.display = "block"

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