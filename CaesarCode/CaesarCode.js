const frequenciesOfLetters = {
    'а': 0.0801, 'б': 0.0159, 'в': 0.0454, 'г': 0.0170, 'д': 0.0298, 'е': 0.0845,
    'ё': 0.0004, 'ж': 0.0094, 'з': 0.0165, 'и': 0.0735, 'й': 0.0121, 'к': 0.0349,
    'л': 0.0440, 'м': 0.0321, 'н': 0.0670, 'о': 0.1097, 'п': 0.0281, 'р': 0.0473,
    'с': 0.0547, 'т': 0.0626, 'у': 0.0262, 'ф': 0.0026, 'х': 0.0097, 'ц': 0.0048,
    'ч': 0.0144, 'ш': 0.0073, 'щ': 0.0036, 'ъ': 0.0004, 'ы': 0.0190, 'ь': 0.0174,
    'э': 0.0032, 'ю': 0.0064, 'я': 0.0201,
    'А': 0.0801, 'Б': 0.0159, 'В': 0.0454, 'Г': 0.0170, 'Д': 0.0298, 'Е': 0.0845,
    'Ё': 0.0004, 'Ж': 0.0094, 'З': 0.0165, 'И': 0.0735, 'Й': 0.0121, 'К': 0.0349,
    'Л': 0.0440, 'М': 0.0321, 'Н': 0.0670, 'О': 0.1097, 'П': 0.0281, 'Р': 0.0473,
    'С': 0.0547, 'Т': 0.0626, 'У': 0.0262, 'Ф': 0.0026, 'Х': 0.0097, 'Ц': 0.0048,
    'Ч': 0.0144, 'Ш': 0.0073, 'Щ': 0.0036, 'Ъ': 0.0004, 'Ы': 0.0190, 'Ь': 0.0174,
    'Э': 0.0032, 'Ю': 0.0064, 'Я': 0.0201
};

function CaesarDecrypt(text)
{
    let letters = Object.keys(frequenciesOfLetters);
    let countOfLetters = 0;
    let textFrequencies = {};
    let letter;

    letters.forEach((letter => textFrequencies[letter] = 0));
    for (let i = 0; i < text.length; i++)
    {
        letter = text[i];
        if (letters.includes(letter))
        {
            countOfLetters++;
            textFrequencies[letter]++;
        }
    }
    letters.forEach((letter) => textFrequencies[letter] /= countOfLetters );

    let minValue = 999999999;
    let ansShift = 0;
    let currentValue;
    for (let i = 0; i < letters.length; i++)
    {
        currentValue = 0;
        for (let j = 0; j < letters.length; j++)
            currentValue += Math.abs(frequenciesOfLetters[letters[j]]
                - textFrequencies[letters[(j + i) % letters.length]]);
        if (currentValue < minValue)
        {
            minValue = currentValue;
            ansShift = i;
        }
    }

    this.Shift = ansShift % 33;
    let decodeString  = "";
    for (let i = 0; i < text.length; i++)
        if (letters.includes(text[i])) 
        {
            let currentLetter = letters[(letters.indexOf(text[i].toLowerCase()) + letters.length - ansShift) % letters.length];
            if (text[i].toLowerCase() == text[i])
                currentLetter = currentLetter.toLowerCase();
            else
                currentLetter = currentLetter.toUpperCase();
            decodeString += currentLetter;
        }
        else
            decodeString  += text[i];
    this.DecodeString = decodeString;
}

const fs = require('fs');
let string = fs.readFileSync(process.argv[2], 'utf8');
let outFile = process.argv[3];
let result = new CaesarDecrypt(string);
console.log('Shift of Ceasar code is ', result.Shift);
console.log('DecodeString return to ', process.argv[3]);
fs.writeFileSync(outFile, result.DecodeString);
