<script lang="ts">
    import { browser } from "$app/environment";
    import { formatTime } from "$lib/functions";
    import { players } from "$lib/players";
    import type { Game, Player } from "$lib/types";
    import FluentPlay24Filled from '~icons/fluent/play-24-filled';
    import FluentPause24Filled from '~icons/fluent/pause-24-filled';
    import MdiArrow from '~icons/mdi/arrow';

    let game: Game;

    let playing: boolean = true;
    let startTime: number = Date.now();
    let elapsedTime: number = 0;
    let elapsedTimePauseHold: number = 0;

    if (browser) {
        const urlParams = new URLSearchParams(window.location.search);
        const playerId = urlParams.get("playerid");
        if (!playerId) {
            throw new Error("Player ID not found in URL");
        }
        currentPlayer = players.find((p) => p.id === parseInt(playerId));
        if (!currentPlayer) {
            throw new Error("Player not found");
        }

        console.log("Player found:", currentPlayer);
    }

    if (browser) {
        setInterval(() => {
            if (currentPlayer && playing) {
                const now = Date.now();
                elapsedTime = Math.floor((now - startTime) / 1000) + elapsedTimePauseHold;
            }
        }, 1000);
    }

    function pause(){
        playing = false;
        elapsedTimePauseHold = elapsedTime;
    }

    function unpause(){
        playing = true;
        startTime = Date.now();
    }

</script>

{#if currentPlayer === undefined}
    <p>Loading...</p>
{:else}
    <div class="flex flex-col items-center justify-center h-screen w-screen" style="background-color: {currentPlayer.color.color}">
        <!-- Hamburger Menu -->
        <div class="absolute top-4 left-4">
            <div class="dropdown">
                <button class="btn-icon btn-icon-lg rounded-full preset-filled-primary-500" aria-label="Menu" data-dropdown-toggle="dropdown">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
                <div id="dropdown" class="dropdown-content bg-white shadow-lg rounded-lg p-4 mt-2">
                    <ul class="space-y-2">
                        <li><a href="/" class="text-gray-700 hover:text-gray-900">Home</a></li>
                        <li><a href="/settings" class="text-gray-700 hover:text-gray-900">Settings</a></li>
                        <li><a href="/help" class="text-gray-700 hover:text-gray-900">Help</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Player Info -->
        <h1 class="text-5xl font-bold text-white">{currentPlayer.name}</h1>

        <!-- Timer Display -->
        <p class="text-8xl font-mono text-white mt-4 mb-6">{formatTime(elapsedTime)}</p>

        <!-- Play/Pause Button -->
        <div class="controls">
            {#if playing}
                <button class="btn-icon btn-icon-lg rounded-full preset-filled-primary-500 scale-150 mr-5" on:click={pause}><FluentPause24Filled /></button>
            {:else}
                <button class="btn-icon btn-icon-lg rounded-full preset-filled-primary-500 scale-150 mr-5" on:click={unpause}><FluentPlay24Filled /></button>
            {/if}

            <!-- Skip Button -->
            <button class="btn-icon btn-icon-lg rounded-full preset-filled-primary-500 scale-150 ml-5 mt-4" on:click={() => currentPlayer.seconds += 10}><MdiArrow /></button>
        </div>
    </div>
{/if}

<style>
    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        left: 0;
        z-index: 1;
        pointer-events: none;
    }
    .dropdown:focus-within .dropdown-content {
        display: block;
        pointer-events: auto;
    }
</style>