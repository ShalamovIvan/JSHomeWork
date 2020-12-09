function BruteforceSearch(string, subString)
{
    let result = new Array();
    let isBadSubString;
    for (let i = 0; i < string.length - subString.length + 1; i++)
    {   
        isBadSubString = false;
        for (let j = 0; j < subString.length; j++)
        {
            if (string[i + j] != subString[j])
            {
                isBadSubString = true;
                break;
            }
        }
        if (isBadSubString)
            continue;
        result.push(i);
    }
    console.log('BruteforceSearch: ', result);
}

function HashSearch(string, subString)
{
	let subStringHash = [0, 0, 0];
    let currentHash = [0, 0, 0];
    let result = new Array();
    let primeNumber = 17;    
    for (let i = 0; i < subString.length; i++)
    {
        subStringHash[0] += subString.charCodeAt(i)
        currentHash[0] += string.charCodeAt(i);

        subStringHash[1] += Pow(subString.charCodeAt(i), 2)
        currentHash[1] += Pow(string.charCodeAt(i), 2);

        subStringHash[2] += Pow(primeNumber, subString.charCodeAt(i))
        currentHash[2] += Pow(primeNumber, string.charCodeAt(i));

    }
    if (subStringHash[0] == currentHash[0]
    	|| subStringHash[1] == currentHash[1]
    	|| subStringHash[2] == currentHash[2])
    {
        isBadSubString = false;
        for (let i = 0; i < subString.length; i++)
        {   
            if (string[i] != subString[i])
            {
                isBadSubString = true;
                break;
            }
        }
        if (!isBadSubString)
            result.push(0);
    }
    for (let j = subString.length; j < string.length; j++)
    {
        currentHash[0] += -string.charCodeAt(j - subString.length) + string.charCodeAt(j);
        currentHash[1] += -Pow(string.charCodeAt(j - subString.length), 2) + Pow(string.charCodeAt(j), 2);
		currentHash[2] += -Pow(primeNumber, string.charCodeAt(j - subString.length)) + Pow(primeNumber, string.charCodeAt(j));
        if (subStringHash[0] == currentHash[0]
    	|| subStringHash[1] == currentHash[1]
    	|| subStringHash[2] == currentHash[2])
        {
            isBadSubString = false;
            for (let i = 0; i < subString.length; i++)
            {   
                if (string[j - subString.length + 1 + i] != subString[i])
                {
                    isBadSubString = true;
                    break;
                }
            }
            if (!isBadSubString)
                result.push(j - subString.length + 1);
        }
    }
    console.log('HashSearch: ', result);
}

function Pow(base, exponent)
{
    let modularFieldBase = 9999997;
    let result = 1;
    for (let i = 0; i < exponent; i++)
    {
        result *= base;
        result %= modularFieldBase;
    }
    return result;
}

//Для работы нужно 2 аргументом указать файл с текстом для поиска, а 3 аргументом файлом с искомой строкой
const fs = require('fs');
let string = fs.readFileSync(process.argv[2], 'utf8');
let subString = fs.readFileSync(process.argv[3], 'utf8');
BruteforceSearch(string, subString);
HashSearch(string, subString);
