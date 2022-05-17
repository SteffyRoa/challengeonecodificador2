const code = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat"
}

const decode = {
    ai: "a",
    enter: "e",
    imes: "i",
    ober: "o",
    ufat: "u"
}

function encriptar(event) {
    event.preventDefault();
    let pattern_checked = checkPattern();
    document.getElementById('warning').hidden = false;
    document.getElementById('copy').hidden = true;
    document.getElementById('message').innerText = "";
    if (pattern_checked) {
        let text = document.querySelector("#catcher").value;
        let encriptedText = new String;
        for (let index = 0; index < text.length; index++) {
            if (!code.hasOwnProperty(text[index])) {
                encriptedText = encriptedText + text[index];
            } else {
                encriptedText = encriptedText + code[text[index]];
            }
        }
        document.getElementById('message').innerText = encriptedText;
        document.getElementById('warning').hidden = true;
        document.getElementById('copy').hidden = false;
        document.querySelector("#catcher").value = "";
    }
}

function desencriptar(event) {
    event.preventDefault();
    let pattern_checked = checkPattern();
    document.getElementById('warning').hidden = false;
    document.getElementById('copy').hidden = true;
    document.getElementById('message').innerText = "";
    if (pattern_checked) {
        let text = document.querySelector("#catcher").value;
        let unencryptedText = new String(text);
        var count = Object.keys(decode).length;
        console.log(count);
        (Object.keys(decode)).forEach(key => {
            let search = key;
            let replace = decode[key];
            unencryptedText = unencryptedText.replaceAll(search, replace);
        });
        document.getElementById('message').innerText = unencryptedText;
        document.getElementById('warning').style.display = "none";
        document.getElementById('copy').hidden = false;
        document.querySelector("#catcher").value = "";
    }
}
function copy() {
    let text = document.getElementById('message').innerHTML;
    navigator.clipboard.writeText(text);
}

function checkPattern() {
    let notification = document.getElementById('notify');
    let notificationText = document.getElementById('notification');
    let messageValidation = document.getElementById('catcher');
    let message = messageValidation.value;
    let re = new RegExp("[A-ZáéíóúäÿëïöüÁÉÍÓÚÄËÜÏÖ]");
    if (re.test(message)) {
        notification.className = 'invalid';
        notificationText.classList.add('invalid');
        return false;
    } else {
        notification.className = 'valid';
        notificationText.classList.remove('invalid');
        return true;
    }
}

let encriptado = document.querySelector("#encrypt");
encriptado.addEventListener('click', encriptar);
let desencriptado = document.querySelector("#decrypt");
desencriptado.addEventListener('click', desencriptar);
let copiarTexto = document.querySelector('#copy');
copiarTexto.addEventListener('click', copy);
document.getElementById('catcher').addEventListener("keyup", checkPattern);
document.addEventListener('keypress', function (event) {
    if (event.code === 'Enter') {
        event.preventDefault();
        return false;
    }
});