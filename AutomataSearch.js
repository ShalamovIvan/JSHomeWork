function Automata(subString)
{
    this.startState = 0;
    this.endState = subString.length;
    alph = new Array();
    for (let i = 0; i < subString.length; i++)
        alph[subString[i]] = 0;
    this.del = new Array(this.endState + 1);
    for (let i = 0; i <= subString.length; i++)
        this.del[i] = new Array();
    for (let i in alph)
        this.del[0][i] = 0;
    let prev;
    for (let j = 0; j < subString.length; j++)
    {
        prev = this.del[j][subString[j]];
        this.del[j][subString[j]] = j + 1;
        for (let i in alph)
            this.del[j + 1][i] = this.del[prev][i];
    }
}

function AutomataSearch(string, subString)
{
    let result = new Array();
    if (string.length < subString.length)
        return result;
    let automata = new Automata(subString);
    //console.log(automata);
    let currentState = automata.startState;
    for (let i = 0; i < string.length; i++)
    {
        currentState = automata.del[currentState][string[i]] || automata.startState;
        //console.log(currentState);
        if (currentState == automata.endState)
            result.push(i + 1 - automata.endState);
    }
    return result;
}

console.log(AutomataSearch('testtesttesttest', 'test'));