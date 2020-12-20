function Dijkstra(input)
{
	let priority = {
		"^": 0,
		"*": 1,
		"/": 1,
		"+": 2,
		"-": 2
	};
	let result = [];
	let stack = [];
	let current;
	for (let i = 0; i < input.length; i++)
	{		
		if (priority[input[i]] != undefined) 
		{
			//console.log(input[i], ' ', priority[input[i]]);
			current = stack.pop();
			while (stack.length >= 0 && priority[current] <= priority[input[i]])
            {
                result.push(current);
                current = stack.pop();
            }	
            if (current == "(" || priority[current] >= priority[input[i]])
                stack.push(current);
            
            stack.push(input[i]);
		}
		else if (input[i] == "(")
		{
			stack.push(input[i]);
			//console.log(stack);
		}
		else if (input[i] == ")")
        {
            current = stack.pop();
            while (stack.length >= 0 && current != "(") 
            {
                result.push(current);
                current = stack.pop();
            }
            //console.log(stack);
        } 
        else
        	result.push(input[i]);	
	}

	while (stack.length > 0) result.push(stack.pop());   
    
    return result;
}
console.log(Dijkstra([1, "^", 2, "/", "(", 3, "*", 4, ")", "+", 5]).join(' '));

