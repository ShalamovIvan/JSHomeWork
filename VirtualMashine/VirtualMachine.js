const fs = require('fs');
let arg = process.argv;

function ParseCode(input){
	let word = "";
	let code = new Array();
	let digits = "-0123456789";
		for (let i=0 ; i<input.length ; i++)
		{
			if(input[i] == " " || input[i] == '\n' || input[i] == '\r'){
				if (digits.search(word.substr(0, 1)) != -1 && word.length != 0)
				{
					code.push(Number(word));
				}
					
				else {
					if(word != "")
						code.push(word);
				}
				word="";
				continue;
			}
			word += input[i];
		}
		if (digits.search(word.substr(0, 1)) != -1 && word.length != 0)
			{
				code.push(Number(word));
			}
		else {
			if(word != "")
				code.push(word);
		}

	return code;
}

let inputCode = fs.readFileSync(process.argv[2], "utf8"); // программа, которая должна выполниться написанная на псевдокоде
let inputContent = fs.readFileSync(process.argv[3], "utf8"); // файл с входными данными для программы

let code = ParseCode(inputCode);
let input = ParseCode(inputContent);
let memory = new Array();
for (let j = 0 ; j < code.length ; j++)
	memory.push(0);
let i = 0;
let inputIndex = 0;
let len = code.length
	
while (i < len) {
	switch(code[i]){
		case "assing": 
			memory[code[i + 2]] = code[i + 1]; 
			i += 3;
			break;

		case "input":
			memory[code[i + 1]] = input[inputIndex];
			inputIndex++;
			i += 2;
			break;

		case "cmp": 
			if(memory[code[i + 1]] == memory[code[i + 2]]) 
				memory[code[i + 3]] = 1;
			else 
				memory[code[i + 3]] = 0;
			i += 4;
			break;

		case "jnz":
			if (memory[code[i + 1]] == 1){
				i += 3;
				break;
			}
			else{
				i += code[i + 2];
				break;
			}

		case "display":
			console.log(memory[code[i + 1]]);
			i += 2;
			break;

		case "jump":
			i += code[i+1];
			break;

		case "raise":
			memory[code[i+1]] ++;
			i += 2;
			break;

		case "sum": 
			memory[code[i+3]] = memory[code[i+1]] + memory[code[i+2]];
			i += 4;
			break;

		case "subr":
			memory[code[i+3]] = memory[code[i+1]] - memory[code[i+2]];
			i += 4;
			break;

		case "less":
			if(memory[code[i + 1]] < memory[code[i + 2]])
				memory[code[i + 3]] = 1;
			else 
				memory[code[i + 3]] = 0;
			i += 4;
			break;

		case "eq":
			if(memory[code[i + 1]] == memory[code[i + 2]]) 
				memory[code[i + 3]] = 1;
			else 
				memory[code[i + 3]] = 0;
			i += 4;
			break;

		case "inc":
			i += code[i+1];
			break;

		default:
			console.log("invalid command");
			i++;
			break;
	}
} 
