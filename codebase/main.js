console.log("Welcome to code base")
console.log("--------------------")

// States
let numOfStates = Number(prompt("How many states are there?"))
let states = []
for(let i=1; i<=numOfStates; i++){
    var st = prompt(`Name of state ${i} = `).toUpperCase()
    states.push(st)
}
let initialStates = prompt(`Which one is the inital state?`)
let numOfFinalStates = Number(prompt('How many final states are there?'))
let finalStates = []
for(let i=0; i<numOfFinalStates; i++){
    finalStates.push(prompt(`Final state ${i+1}: `))
}


// Input Variables
let numOfVar = Number(prompt("How many variables are there?"))
let variables = []
for(let i=0; i<numOfVar; i++){
    variables.push(prompt(`Name of variable ${i+1} = `).toLowerCase())
}

// Transitions (Error)
let transitions = []
for(let i=0; i<states.length; i++){
    for(let j=0; j<variables.length; j++){
        transitions[i][j] = prompt() // error
    }
}
console.log(transitions)