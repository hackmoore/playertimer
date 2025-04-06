<script lang="ts">
    import ColourPicker from '$lib/ColourPicker.svelte';
    import { playerBackgroundColors } from '$lib/const';
    import type { GameSettings, Player } from '$lib/types';

    const settings: GameSettings = {
        timerMode: "countdown",
        turnTimeLimit: 120,
        timeTurnIncrement: 0,
        forceOrder: true,
        allowPause: true,
        showTotalTime: true,
        showTurnTime: true,
        showTurnTimeLeft: true
    };
    let players: Array<Player> = [];
    let numPlayers: number = 2;
/*
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
*/

    // Function to get the next available color
    function getRandomColor() {
        const availableColors = playerBackgroundColors.filter(color => !players.some(player => player.color.color === color.color));
        if (availableColors.length === 0) {
            return null; // No more available colors
        }
        return availableColors[0];
    }

    $: {
        if (players.length < numPlayers) {
            for (let i = players.length; i < numPlayers; i++) {
                const c = getRandomColor();
                if (!c) {
                    console.warn("No more available colors");
                    break; // No more available colors
                }
                players.push({id: i, name: `Player ${i + 1}`, color: c, seconds: 0 });
            }
        } else if (players.length > numPlayers) {
            players = players.slice(0, numPlayers);
        }
    }

    function submitForm() {

    }
</script>


<div class="grid h-screen grid-rows-[auto_1fr_auto]">
    <header class="p-4 text-center text-4xl">Game Setup</header>
      <div class="grid grid-cols-1 md:grid-cols-[auto_1fr_auto]">
            <aside class="w-32"></aside>
            <main class="p-4 space-y-4">
                <form class="mx-auto w-full max-w-md space-y-4" on:submit|preventDefault={submitForm}>
                    <p class="text-xl">Countdown Mode</p>
                    <label class="flex items-center space-x-2">
                        <input type="radio" name="timerMode" class="radio" value="countdown" bind:group={settings.timerMode} />
                        <p>Countdown</p>
                    </label>
                    <label class="flex items-center space-x-2">
                        <input type="radio" name="timerMode" class="radio" value="countup" bind:group={settings.timerMode} />
                        <p>Countup</p>
                    </label>
                    <hr class="hr" />

                    {#if settings.timerMode == "countdown"}
                        <label class="label">
                            <span class="label-text">Turn Time Limit (seconds)</span>
                            <input type="number" class="input" bind:value={settings.turnTimeLimit} min="1" />
                        </label>
                        <label class="label">
                            <span class="label-text">Time Turn Increment (seconds)</span>
                            <input type="number" class="input" bind:value={settings.timeTurnIncrement} min="0" />
                        </label>
                        <hr class="hr" />
                    {/if}

                    <p class="text-xl">Generic Settings</p>
                    <label class="flex items-center space-x-2">
                        <input type="checkbox" class="checkbox" bind:checked={settings.forceOrder} />
                        <p>Follow Turn Order</p>
                    </label>

                    <label class="flex items-center space-x-2">
                        <input type="checkbox" class="checkbox" bind:checked={settings.allowPause} />
                        Allow Pauses
                    </label>

                    <hr class="hr" />

                    <p class="text-xl">Display Settings</p>
                    <label class="flex items-center space-x-2">
                        <input type="checkbox" class="checkbox" bind:checked={settings.showTotalTime} />
                        <p>Show Total Time</p>
                    </label>

                    <label class="flex items-center space-x-2">
                        <input type="checkbox" class="checkbox" bind:checked={settings.showTurnTime} />
                        <p>Show Turn Time</p>
                    </label>

                    <label class="flex items-center space-x-2">
                        <input type="checkbox" class="checkbox" bind:checked={settings.showTurnTimeLeft} />
                        <p>Show Turn Time Left</p>
                    </label>

                    <hr class="hr" />

                    <p class="text-xl">Players</p>
                    <label class="label">
                        <span class="label-text">Number of Players</span>
                        <input type="number" class="input" min="1" max="25" bind:value={numPlayers} placeholder="Enter number of players" />
                    </label>

                    {#each Array(numPlayers) as _, index}
                        <div class="player-input mt-2">
                            <label class="label">
                                <span class="label-text">Player {index + 1} Name</span>
                                <input type="text" class="input" bind:value={players[index].name} placeholder="Enter player name"/>
                            </label>

                            <label class="label mt-3">
                                <span class="label-text">Player {index + 1} Colour</span>
                                <ColourPicker size="sm" palette={playerBackgroundColors} players={players} thisPlayer={index} on:colorSelect={(e) => players[index].color = e.detail} />
                            </label>
                        </div>
                    {/each}

                    <button type="submit">Save Settings</button>
                </form>
            </main>
            <aside class="w-32"></aside>
        </div>
    <footer class="bg-blue-500 p-4">(footer)</footer>
</div>
<style>
    form {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(5, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
    }


    input[type="radio"],
    input[type="checkbox"] {
        margin-right: 0.5rem;
    }

    button {
        align-self: center;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        cursor: pointer;
    }
</style>