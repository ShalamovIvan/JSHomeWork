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
    return result;   
}

function CommonHashSearch(string, subString)
{
    let subStringHash = 0;
    let currentHash = 0;
    let result = new Array();
    for (let i = 0; i < subString.length; i++)
    {
        subStringHash += subString.charCodeAt(i)
        currentHash += string.charCodeAt(i);
    }
    if (subStringHash == currentHash)
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
        currentHash += -string.charCodeAt(j - subString.length) + string.charCodeAt(j);
        if (subStringHash == currentHash)
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
    return result;
}

function SqrHashSearch(string, subString)
{
    let subStringHash = 0;
    let currentHash = 0;
    let result = new Array();
    for (let i = 0; i < subString.length; i++)
    {
        subStringHash += Pow(subString.charCodeAt(i), 2)
        currentHash += Pow(string.charCodeAt(i), 2);
    }
    if (subStringHash == currentHash)
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
        currentHash += -Pow(string.charCodeAt(j - subString.length), 2) + Pow(string.charCodeAt(j), 2);
        if (subStringHash == currentHash)
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
    return result;
}

function PrimeHashSearch(string, subString)
{
    let subStringHash = 0;
    let currentHash = 0;
    let primeNumber = 17;
    let result = new Array();
    for (let i = 0; i < subString.length; i++)
    {
        subStringHash += Pow(primeNumber, subString.charCodeAt(i))
        currentHash += Pow(primeNumber, string.charCodeAt(i));
    }
    if (subStringHash == currentHash)
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
        currentHash += -Pow(primeNumber, string.charCodeAt(j - subString.length)) + Pow(primeNumber, string.charCodeAt(j));
        if (subStringHash == currentHash)
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
    return result;
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

console.log('BruteforceSearch: ', BruteforceSearch(string, subString));
console.log('CommonHashSearch: ', CommonHashSearch(string, subString));
console.log('SqrHashSearch: ', SqrHashSearch(string, subString));
console.log('PrimeHashSearch: ', PrimeHashSearch(string, subString));