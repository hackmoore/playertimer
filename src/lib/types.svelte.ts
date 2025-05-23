import { playerBackgroundColors } from "./const";

export class Color {
    color: string = $state("");
    name: string = $state("");

    constructor(color: string, name: string) {
        this.color = color;
        this.name = name;
    }
}

function nextFreeColor() {
    for( const c of playerBackgroundColors ) {
        if( !game.players.some( p => p.color == c ) ) {
            return c;
        }
    }
    return null;
};

export class Player {
    id: number = $state(0);
    name: string = $state("");
    seconds: number = $state(0);
    color: Color = $state(new Color("", ""));

    constructor(
        id: number,
        name: string,
        seconds: number = 0,
        color: Color | null = null
    ) {
        this.id = id;
        this.name = name;
        this.seconds = seconds;
        if (color == null) {
            const c = nextFreeColor();
            if (c == null) {
                throw new Error("No free colors available");
            }
            this.color = c;
        } else {
            this.color = color;
        }
    }

    setTime(seconds: number) {
        this.seconds = seconds;
    }
}

export class GameSettings {
    timerMode: "countdown" | "countup" = $state("countdown");

    // Settings for a countdown timer
    turnTimeLimit: number = $state(0); // How long each player has to take their turn
    timeTurnIncrement: number = $state(0); // How much time to add to the total time after each turn

    // Generic settings
    forceOrder: boolean = $state(true);
    allowPause: boolean = $state(true);

    // Display Settings
    showTotalTime: boolean = $state(true);
    showTurnTime: boolean = $state(true);
    showTurnTimeLeft: boolean = $state(true);

    constructor(
        timerMode: "countdown" | "countup" = "countup",
        turnTimeLimit: number = 120,
        timeTurnIncrement: number = 0,
        forceOrder: boolean = true,
        allowPause: boolean = true,
        showTotalTime: boolean = true,
        showTurnTime: boolean = true,
        showTurnTimeLeft: boolean = true
    ) {
        this.timerMode = timerMode;
        this.turnTimeLimit = turnTimeLimit;
        this.timeTurnIncrement = timeTurnIncrement;
        this.forceOrder = forceOrder;
        this.allowPause = allowPause;
        this.showTotalTime = showTotalTime;
        this.showTurnTime = showTurnTime;
        this.showTurnTimeLeft = showTurnTimeLeft;
    }
}

class Game {
    players: Player[] = $state([]); // Inserted in gmae order
    currentPlayerIndex: number = $state(0);
    settings: GameSettings = $state(new GameSettings());
    numPlayers = $derived(this.players.length);
    currentPlayer = $derived(this.players[this.currentPlayerIndex]);
    availableColors = $derived(
        playerBackgroundColors.filter((color) => {
            this.players.some((player) => player.color.color === color.color);
        })
    );

    constructor(players: Array<Player>, settings: GameSettings) {
        this.players = players;
        this.currentPlayerIndex = 0;
        this.settings = settings;
    }

    addPlayer(name: string) {
        const newPlayer = new Player(this.players.length + 1, name);
        newPlayer.color = this.availableColors[0];
        this.players.push(newPlayer);
        return newPlayer;
    }

    setCurrentPlayer(index: number) {
        if (index >= 0 && index < this.players.length) {
            this.currentPlayerIndex = index;
        }
    }
}

export const game = new Game(
    [new Player(1, "Player 1"), new Player(2, "Player 2")],
    new GameSettings()
);
