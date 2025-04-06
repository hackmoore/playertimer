import { playerBackgroundColors } from "./const";

export interface Color {
    color: string,
    name: string
}

export interface Player {
    id: number,
    name: string,
    seconds: number,
    color: Color
}

export interface GameSettings {
    timerMode: "countdown" | "countup",

    // Settings for a countdown timer
    turnTimeLimit: number,                      // How long each player has to take their turn
    timeTurnIncrement: number,                  // How much time to add to the total time after each turn
    
    // Generic settings
    forceOrder: boolean,
    allowPause: boolean,
    
    // Display Settings
    showTotalTime: boolean,
    showTurnTime: boolean,
    showTurnTimeLeft: boolean,
};

export interface Game {
    players: Player[],
    currentPlayer: number,
    settings: GameSettings,
}