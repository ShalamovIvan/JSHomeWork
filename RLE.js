function codeEsc(inText){
	let i = 0, n = 1;
	let resStr = '';
	while (i < inText.length){
		while(inText.charAt(i) == inText.charAt(i + n))
			n++;
		nJump = n;
		while( n >= 127){
			resStr += '#' + String.fromCharCode(127) + inText.charAt(i);
			n -= 127;
		}
		if ((n > 3) || (inText.charAt(i) == '#'))
			resStr += '#' + String.fromCharCode(n) + inText.charAt(i)
		else
			for(k = 0; k < n; k++)
				resStr += inText.charAt(i);
		i += nJump;
		n = 1;
	}
	return resStr;
}

function decodeEsc(inText){
	let resStr = '';
	for (let i = 0; i < Buffer.byteLength(inText); i++){
		if (inText[i] == '#'){
			let count = inText[i+1].charCodeAt(0);
			for (let j = 0; j < count; j++)
				resStr+=inText[i+2];
			i+=2;
		}
		else
			resStr+=inText[i];
	}
	return resStr;
}

const fs = require('fs');
let fileContent = fs.readFileSync(process.argv[3], 'utf8');
let outFile = process.argv[4];
let outString;
//console.log(outFile)
if (process.argv[2] == 'code')
	outString = codeEsc(fileContent);
else 
	outString = decodeEsc(fileContent);
//console.log(outString);
fs.writeFileSync(outFile, outString);