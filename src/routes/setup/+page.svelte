<script lang="ts">
    import { game, Player } from "$lib/types.svelte";
    import ColorPicker from "$lib/ColorPicker.svelte";
    import { playerBackgroundColors } from "$lib/const";

    const changeNumPlayers = (newPlayerCount: number) => {
        if (newPlayerCount < game.numPlayers) {
            game.players.length = newPlayerCount;
        } else if (newPlayerCount > game.numPlayers) {
            for (let i = game.numPlayers; i < newPlayerCount; i++) {
                game.players.push(new Player(i + 1, `Player ${i + 1}`));
            }
        }
    };

    const submitForm = (ev: SubmitEvent) => {
        ev.preventDefault();
    };
</script>

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
    <header class="p-4 text-center text-4xl">Game Setup</header>
    <div class="grid grid-cols-1 md:grid-cols-[auto_1fr_auto]">
        <aside class="w-32"></aside>
        <main class="p-4 space-y-4">
            <form
                class="mx-auto w-full max-w-md space-y-4"
                onsubmit={submitForm}
            >
                <p class="text-xl">Countdown Mode</p>
                <label class="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="timerMode"
                        class="radio"
                        value="countdown"
                        bind:group={game.settings.timerMode}
                    />
                    <p>Countdown</p>
                </label>
                <label class="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="timerMode"
                        class="radio"
                        value="countup"
                        bind:group={game.settings.timerMode}
                    />
                    <p>Countup</p>
                </label>
                <hr class="hr" />

                {#if game.settings.timerMode == "countdown"}
                    <label class="label">
                        <span class="label-text">Turn Time Limit (seconds)</span
                        >
                        <input
                            type="number"
                            class="input"
                            bind:value={game.settings.turnTimeLimit}
                            min="1"
                        />
                    </label>
                    <label class="label">
                        <span class="label-text"
                            >Time Turn Increment (seconds)</span
                        >
                        <input
                            type="number"
                            class="input"
                            bind:value={game.settings.timeTurnIncrement}
                            min="0"
                        />
                    </label>
                    <hr class="hr" />
                {/if}

                <p class="text-xl">Generic Settings</p>
                <label class="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        class="checkbox"
                        bind:checked={game.settings.forceOrder}
                    />
                    <p>Follow Turn Order</p>
                </label>

                <label class="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        class="checkbox"
                        bind:checked={game.settings.allowPause}
                    />
                    Allow Pauses
                </label>

                <hr class="hr" />

                <p class="text-xl">Display Settings</p>
                <label class="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        class="checkbox"
                        bind:checked={game.settings.showTotalTime}
                    />
                    <p>Show Total Time</p>
                </label>

                <label class="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        class="checkbox"
                        bind:checked={game.settings.showTurnTime}
                    />
                    <p>Show Turn Time</p>
                </label>

                <label class="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        class="checkbox"
                        bind:checked={game.settings.showTurnTimeLeft}
                    />
                    <p>Show Turn Time Left</p>
                </label>

                <hr class="hr" />

                <p class="text-xl">Players</p>
                <label class="label">
                    <span class="label-text">Number of Players</span>
                    <input
                        type="number"
                        class="input"
                        min="1"
                        max="25"
                        value={game.numPlayers}
                        placeholder="Enter number of players"
                        onchange={(e) =>
                            changeNumPlayers(
                                Number.parseInt(e.currentTarget.value)
                            )}
                        oninput={(e) =>
                            changeNumPlayers(
                                Number.parseInt(e.currentTarget.value)
                            )}
                    />
                </label>

                {#each { length: game.numPlayers }, index}
                    <div class="player-input mt-2">
                        <label class="label">
                            <span class="label-text"
                                >Player {index + 1} Name</span
                            >
                            <input
                                type="text"
                                class="input"
                                bind:value={game.players[index].name}
                                placeholder="Enter player name"
                            />
                        </label>

                        <label class="label mt-3">
                            <span class="label-text"
                                >Player {index + 1} Color</span
                            >
                            <ColorPicker
                                size="sm"
                                palette={playerBackgroundColors}
                                players={game.players}
                                thisPlayer={index}
                            />
                        </label>
                    </div>
                {/each}

                <button type="submit" class="btn">Save Settings</button>
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
