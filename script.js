const passwordDisplay = document.getElementById('password-display');
const lengthSlider = document.getElementById('length-slider');
const lengthVal = document.getElementById('length-val');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const strengthIndicator = document.getElementById('strength-indicator');

const keys = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

// Atualiza dinamicamente o número do comprimento na tela
lengthSlider.addEventListener('input', (e) => {
    lengthVal.textContent = e.target.value;
});

// Função principal de geração
function generatePassword() {
    const length = +lengthSlider.value;
    let allowedChars = '';
    let password = '';

    if (uppercaseEl.checked) allowedChars += keys.uppercase;
    if (lowercaseEl.checked) allowedChars += keys.lowercase;
    if (numbersEl.checked) allowedChars += keys.numbers;
    if (symbolsEl.checked) allowedChars += keys.symbols;

    if (allowedChars === '') {
        passwordDisplay.textContent = 'Selecione uma opção!';
        strengthIndicator.textContent = 'Inexistente';
        strengthIndicator.className = 'strength-weak';
        return;
    }

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    passwordDisplay.textContent = password;
    evaluateStrength(password, length);
}

// Avalia a complexidade da senha gerada
function evaluateStrength(password, length) {
    let typesCount = 0;
    if (uppercaseEl.checked) typesCount++;
    if (lowercaseEl.checked) typesCount++;
    if (numbersEl.checked) typesCount++;
    if (symbolsEl.checked) typesCount++;

    if (length >= 12 && typesCount >= 3) {
        strengthIndicator.textContent = 'Forte';
        strengthIndicator.className = 'strength-strong';
    } else if (length >= 8 && typesCount >= 2) {
        strengthIndicator.textContent = 'Média';
        strengthIndicator.className = 'strength-medium';
    } else {
        strengthIndicator.textContent = 'Fraca';
        strengthIndicator.className = 'strength-weak';
    }
}

// Copia o resultado para o Clipboard
copyBtn.addEventListener('click', () => {
    const password = passwordDisplay.textContent;
    if (!password || password === 'SuaSenhaAqui' || password === 'Selecione uma opção!') return;

    navigator.clipboard.writeText(password).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copiado!';
        copyBtn.style.background = '#10B981';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
    });
});

// Eventos de inicialização
generateBtn.addEventListener('click', generatePassword);
generatePassword(); // Gera uma senha automática ao abrir a página
