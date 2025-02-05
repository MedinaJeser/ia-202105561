
const possibleStates = [
    { 'location': 'A', 'stateA': 'Dirty', 'stateB': 'Dirty' },
    { 'location': 'A', 'stateA': 'Dirty', 'stateB': 'Clean' },
    { 'location': 'A', 'stateA': 'Clean', 'stateB': 'Dirty' },
    { 'location': 'A', 'stateA': 'Clean', 'stateB': 'Clean' },
    { 'location': 'B', 'stateA': 'Dirty', 'stateB': 'Dirty' },
    { 'location': 'B', 'stateA': 'Dirty', 'stateB': 'Clean' },
    { 'location': 'B', 'stateA': 'Clean', 'stateB': 'Dirty' },
    { 'location': 'B', 'stateA': 'Clean', 'stateB': 'Clean' }
]

class SimpleReflexVacuumAgent {
    constructor() {
        this.visitedStates = new Set();
        this.location = 'A';
        this.environment = {
            'A': 'Dirty',
            'B': 'Dirty'
        };
    }

    printCurrentState() {
        document.getElementById("log").innerHTML += `<br><br><b>Posición actual: ${this.location} | A = ${this.environment['A']}, B = ${this.environment['B']}</b>`;
    }

    printAllStatesVisited() {
        document.getElementById("log").innerHTML += "<br><br><b>Todos los estados posibles han sido visitados</b>";
    }

    printAction(action) {
        document.getElementById("log").innerHTML += `<br>Acción: ${action}`;
    }

    printExternalAction(action) {
        document.getElementById("log").innerHTML += `<br>Acción externa: ${action}`;
    }

    // Función para limpiar la posición actual
    clean() {
        this.printAction(`Limpiar ${this.location}`);
        this.environment[this.location] = 'Clean';
    }

    // Función para mover la aspiradora a la otra posición
    move() {
        this.location = this.location === 'A' ? 'B' : 'A';
        this.printAction(`Mover a ${this.location}`);
    }

    // Funcion para simular la suciedad de los estados
    dirty() {
        for (const possibleState of possibleStates) {
            const stateKey = `${this.location}-${possibleState.stateA}-${possibleState.stateB}`;
            if (!this.visitedStates.has(stateKey)) {
                if (this.environment['A'] == 'Clean' && possibleState.stateA == 'Dirty') {
                    this.environment['A'] = possibleState.stateA;
                    this.printExternalAction(`Ensuciar A`);
                } else if (this.environment['B'] == 'Clean' && possibleState.stateB == 'Dirty') {
                    this.environment['B'] = possibleState.stateB;
                    this.printExternalAction(`Ensuciar B`);
                }
            } else {
                continue;
            }
        }
    }

    // Función para determinar la acción a realizar por la aspiradora
    action() {
        if (this.environment[this.location] === 'Dirty') {
            this.clean();
        } else {
            this.move();
        }
    }

    // Función para verificar si todos los estados han sido visitados
    allStatesVisited() {
        const stateKey = `${this.location}-${this.environment['A']}-${this.environment['B']}`;
        this.visitedStates.add(stateKey);
        return this.visitedStates.size === 8;
    }

    run() {
        this.printCurrentState();
        this.action();

        if (this.allStatesVisited()) {
            this.printAllStatesVisited();
            return
        }
        
        if (this.environment['A'] == 'Clean' && this.environment['B'] == 'Clean') {
            this.printCurrentState();
            this.dirty();
        }
        
        if (this.allStatesVisited()) {
            this.printAllStatesVisited();
            return
        }

        setTimeout(
            () => this.run(),
            2000
        )
    }
}

const vacuumAgent = new SimpleReflexVacuumAgent();
vacuumAgent.run();