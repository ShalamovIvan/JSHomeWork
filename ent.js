let fs = require('fs');
let arg = process.argv;
let file = arg[2];
function entropy(s)
{
    amountOfChar = new Array();
    amountOfDifferentChar = 0, ans = 0;
    for (i = 0; i < s.length; i++)
    {
        ch = s.charCodeAt(i);
        if (amountOfChar[ch]) amountOfChar[ch]++
        else
        {
            amountOfChar[ch] = 1;
            amountOfDifferentChar++;
        }
    }
    for (let i in amountOfChar)
    {
        ratio = amountOfChar[i] / s.length;
        ans -= ratio * Math.log2(ratio);
    }
    ans /= Math.log2(amountOfDifferentChar) || 1;
    return ans;
}

if (file)
    fs.readFile(file, function(err, data)
        {       
            if (err)
            {
                console.error("File read error occurred: " + err.message)
                return;
            }
            lineStr = data.toString().split('\n')[0];
            console.log(`Entropy of line "${lineStr}" is ${entropy(lineStr)}`);
        }
    )
else
    console.log(`Usage: ${arg[1].split('\\').pop().split('/').pop()} {file path}`);