import { playerBackgroundColors } from "./const";

export class Color {
    color: string;
    name: string;

    constructor(color: string, name: string) {
        this.color = color;
        this.name = name;
    }
}

export class Player {
    id: number;
    name: string;
    seconds: number;
    color: Color;

    constructor(id: number, name: string, seconds: number = 0, colour: Color|null = null) {
        this.id = id;
        this.name = name;
        this.seconds = seconds;
        if (colour == null) {
            const tmpColorArray = playerBackgroundColors[Math.floor(Math.random() * playerBackgroundColors.length)];
            this.color = new Color(tmpColorArray.color, tmpColorArray.name);
        } else {
            this.color = colour;
        }
    }

    setTime(seconds: number) {
        this.seconds = seconds;
    }
}

export class GameSettings {
    timerMode: "countdown" | "countup";

    // Settings for a countdown timer
    turnTimeLimit: number;                      // How long each player has to take their turn
    timeTurnIncrement: number;                  // How much time to add to the total time after each turn
    
    // Generic settings
    forceOrder: boolean;
    allowPause: boolean;
    
    // Display Settings
    showTotalTime: boolean;
    showTurnTime: boolean;
    showTurnTimeLeft: boolean;

    constructor(timerMode: "countdown" | "countup" = "countup", turnTimeLimit: number = 120, timeTurnIncrement: number = 0, forceOrder: boolean = true, allowPause: boolean = true, showTotalTime: boolean = true, showTurnTime: boolean = true, showTurnTimeLeft: boolean = true) {
        this.timerMode = timerMode;
        this.turnTimeLimit = turnTimeLimit;
        this.timeTurnIncrement = timeTurnIncrement;
        this.forceOrder = forceOrder;
        this.allowPause = allowPause;
        this.showTotalTime = showTotalTime;
        this.showTurnTime = showTurnTime;
        this.showTurnTimeLeft = showTurnTimeLeft;
    }
};

export class Game {
    players: Player[];  // Inserted in gmae order
    currentPlayer: number;
    settings: GameSettings;

    constructor(settings: GameSettings) {
        this.players = [];
        this.currentPlayer = 0;
        this.settings = settings;
    }

    addPlayer(name: string) {
        const newPlayer = new Player(this.players.length + 1, name);
        this.players.push(newPlayer);
        return newPlayer;
    }

    setCurrentPlayer(index: number) {
        if (index >= 0 && index < this.players.length) {
            this.currentPlayer = index;
        }
    }

}