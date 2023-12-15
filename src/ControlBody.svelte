<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    let position = { left: 0, bottom: 0, width: 0 };
    let position_tracker = null as any;
    let element: HTMLElement | null;

    function load_metrics() {
        if (!element) return;
        const bounding_rect = element.getBoundingClientRect();
        position.left = bounding_rect.left;
        position.bottom = bounding_rect.bottom;
        position.width = bounding_rect.width;
    }

    onMount(() => {
        position_tracker = setInterval(() => {
            load_metrics();
        }, 100);
    });

    onDestroy(() => {
        clearInterval(position_tracker);
    });
</script>

<div class="root" bind:this={element}>
    <slot />

    <div style={`
        left: ${position.left}px;
        top: ${position.bottom + 5}px;
        min-width: ${position.width}px;
    `} class="dropdown">
        <slot name="dropdown" />
    </div>
</div>

<style lang="scss">
    @import "./config";

    .root {
        background: $surface-2;
        border: 1px solid $stroke-0;
        border-bottom: 1px solid $stroke-1;
        display: flex;
        align-self: flex-start;

        .dropdown {
            position: fixed;
            box-shadow: 0px 0px 40px rgba(0, 0, 0, 15%);
        }
    }
</style>