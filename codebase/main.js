document.getElementById('transition-table-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var states = document.getElementById('states').value.split(',').map(s => s.trim());
    var inputs = document.getElementById('inputs').value.split(',').map(i => i.trim());
    var transitionsRaw = document.getElementById('transitions').value.split(';').map(t => t.trim());
    var initialState = document.getElementById('initialState').value.trim();
    var finalStates = document.getElementById('finalStates').value.split(',').map(f => f.trim());
    var inputString = document.getElementById('inputString').value.trim();
    
    var transitionTable = {};
    transitionsRaw.forEach(transition => {
        var [from, to] = transition.split('=');
        var [state, input] = from.split(',');
        state = state.trim();
        input = input;
        to = to.trim();
        
        if (!transitionTable[state]) {
            transitionTable[state] = {};
        }
        
        transitionTable[state][input] = to;
    });
    
    // Check for invalid entries
    if (!validateTransitions(states, inputs, transitionTable, initialState, finalStates)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Transition Table',
            text: 'Please ensure all states and inputs are valid and properly formatted.',
        });
        return;
    }
    
    var isAccepted = checkStringAcceptance(transitionTable, initialState, finalStates, inputString);
    
    displayTransitionTable(transitionTable);
    
    if (isAccepted) {
        Swal.fire({
            icon: 'success',
            title: 'String Accepted',
            text: 'The input string is accepted by the transition table.',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'String Rejected',
            text: 'The input string is rejected by the transition table.',
        });
    }
});

function validateTransitions(states, inputs, table, initialState, finalStates) {
    if (!states.includes(initialState)) {
        return false;
    }
    for (let finalState of finalStates) {
        if (!states.includes(finalState)) {
            return false;
        }
    }
    for (let state in table) {
        if (!states.includes(state)) {
            return false;
        }
        for (let input in table[state]) {
            if (!inputs.includes(input) || !states.includes(table[state][input])) {
                return false;
            }
        }
    }
    return true;
}

function displayTransitionTable(table) {
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<h3>Transition Table</h3>';
    
    var tableHtml = '<table class="table table-bordered"><thead><tr><th>State</th>';
    var inputs = Object.keys(table[Object.keys(table)[0]]);
    inputs.forEach(input => {
        tableHtml += `<th>Input ${input}</th>`;
    });
    tableHtml += '</tr></thead><tbody>';
    
    for (let state in table) {
        tableHtml += `<tr><td>${state}</td>`;
        for (let input in table[state]) {
            tableHtml += `<td>${table[state][input]}</td>`;
        }
        tableHtml += '</tr>';
    }
    
    tableHtml += '</tbody></table>';
    resultDiv.innerHTML += tableHtml;
}

function checkStringAcceptance(table, initialState, finalStates, inputString) {
    var currentState = initialState;
    
    for (let char of inputString) {
        if (!table[currentState] || !table[currentState][char]) {
            return false;
        }
        currentState = table[currentState][char];
    }
    
    return finalStates.includes(currentState);
}