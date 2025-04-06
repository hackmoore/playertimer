<script lang="ts">
    import { Color, Player } from "./types";

    export let palette: Array<Color>;
    export let players: Array<Player>;          // Bind
    export let thisPlayer: number;
    export let onColorSelect: (color: Color) => void = () => {};
    export let size: "sm"|"lg" = "lg";

    function selectColor(color: Color, isRestricted: boolean) {
        if (isRestricted) {
            alert("This color is already selected by another player and cannot be selected.");
            return;
        }
        players[thisPlayer].color = color;
        onColorSelect(color);
    }

    
</script>

<div class="colorPicker {size}">
    {#each palette as color}
    {@const isRestricted = players.some(player => player.color.color === color.color && player.id !== players[thisPlayer].id)}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="colorSample" onclick={() => selectColor(color, isRestricted)}>
            <div class="sample {players[thisPlayer].color.color==color.color?'selected':''} {isRestricted?'restricted':''}" style="background-color: {color.color};"></div>
            <p class="colorName">{color.name}</p>
        </div>
    {/each}
</div>

<style>
    .colorPicker {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
        grid-template-rows: repeat(1, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        align-items: start;
    }

    .colorPicker.lg .sample {
        width: 50px;
        height: 50px;
        margin: 5px;
    }

    .colorPicker.sm .sample {
        width: 25px;
        height: 25px;
        margin: 5px;
    }

    .colorSample {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .colorSample:hover {
        transform: scale(1.1);
        transition: transform 0.2s;
    }
    .colorSample:active {
        transform: scale(0.9);
        transition: transform 0.2s;
    }
    .colorPicker.lg .colorName {
        text-align: center;
        font-size: 12px;
        margin-top: 5px;
    }

    .colorPicker.sm .colorName {
        display: none;
    }

    .sample.selected {
        border: 1px solid white;
        box-shadow: 0 0 5px black;
    }
    
</style>