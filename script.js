const typing_text = document.querySelector('.text-of-typing p');
const inputField = document.querySelector('.container .input-field');
const errorTag = document.querySelector('.errors span');
const timeTag = document.querySelector('.time span');
const wpmTag = document.querySelector('.wpm span');//speed
const cpmTag = document.querySelector('.cpm span');//accuracy
const button = document.querySelector('button');

//this is paragraph text you see in output 
const paragraphs = [
    "The original name was Mocha, a name chosen by Marc Andreessen, founder of Netscape. In September of 1995, the name was changed to LiveScript. In December 1995, after receiving a trademark license from Sun, the name JavaScript was adopted.",
    "JavaScript is an object-based scripting language which is lightweight and cross-platform.It is an interpreted, full-fledged programming language that enables dynamic interactivity on websites when applied to an HTML document.",
    "It was introduced in the year 1995 for adding programs to the webpages in the Netscape Navigator browser. Since then, it has been adopted by all other graphical web browsers. With JavaScript, users can build modern web applications to interact directly without reloading the page every time.",
    "JavaScript is a dynamic type language, means you don't need to specify type of the variable because it is dynamically used by JavaScript engine. You need to use var here to specify the data type. It can hold any type of values such as numbers, strings ",
    "Anonymous function that has no name. These functions are declared dynamically at runtime using the function operator instead of the function declaration. The function operator is more flexible than a function declaration. It can be easily used in the place of an expression.",
    "Node js is open sourcecross-platform JavaScript runtime environment and library to run web applications outside the client’s browser. It is used to create server-side web application.perfect for data-intensive applications as it uses an asynchronous, event-driven model. You can use  I/O intensive web applications like video streaming sites. You can also use it for developing: Real-time web applications, Network applications. ",
    "A single thread from the Thread Pool is assigned to a single complex request. This thread is responsible for completing a particular blocking request by accessing external resources, such as computation, database, file system.Once the task is carried out completely, the response is sent to the Event Loop that sends that response back to the client.",
]



//major all things function start
let characterIndex = 0;
let errors = 0;
let timer;
let maxTime = 60; // increase or decrease your wish
let timeLeft = maxTime;
let isTyping = 0;

function randomParagraph(){
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    
    typing_text.innerHTML = "";

    paragraphs[randomIndex].split("").forEach((span) => {
        let spanTag = `<span>${span}</span>`;
        typing_text.innerHTML += spanTag;
    });

    typing_text.querySelectorAll('span')[0].classList.add('active');

    document.addEventListener('keydown', () => inputField.focus());
    typing_text.addEventListener('click', () => inputField.focus());
}
randomParagraph();

function initTyping(){
    const characters = typing_text.querySelectorAll('span');
    
    let typedCharacter = inputField.value.split("")[characterIndex];

    if(characterIndex < characters.length - 1 && timeLeft > 0){
        if(!isTyping){
            timer = setInterval(initTimer, 1000);
            isTyping = true;   
        }
    
        if(typedCharacter == null){//if user typed backspace
            characterIndex--;
           //check conditions  and also incorrect color be red , then correct color be green  see css code
            if(characters[characterIndex].classList.contains('incorrect')){
                errors--;
            }
    
            characters[characterIndex].classList.remove('correct', 'incorrect');
        }
        else{
            if(characters[characterIndex].innerText === typedCharacter){
                characters[characterIndex].classList.add('correct')
            }
            else{
                errors++
                characters[characterIndex].classList.add('incorrect')
            }
            characterIndex++;
        }
    
    
        characters.forEach(span => span.classList.remove('active'));
        characters[characterIndex].classList.add('active');
    
        errorTag.innerText = errors;
    
        cpmTag.innerText = characterIndex - errors;//cpm will not count errors
    
        let wpm = Math.round((((characterIndex - errors) / 5) / (maxTime - timeLeft)) * 60);// speed & time
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerText = wpm;
    }
    else{
        inputField.value = "";
        clearInterval(timer);
    }
    
}

inputField.addEventListener('input', initTyping);

function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
    }else{
        clearInterval(timer);
    }
}
//this will be final things error, time and soon
function resetcontent(){
    randomParagraph()
    inputField.value = "";
    clearInterval(timer);
    timeLeft = maxTime;
    characterIndex = 0;
    errors = 0;
    isTyping = 0;
    timeTag.innerText = timeLeft;
    errorTag.innerText = errors;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

button.addEventListener('click', resetcontent);
