<script lang="ts">
    export let direction = "row";
</script>

<div style={`direction: ${direction};`} class="root">
    <slot />
</div>

<style lang="scss">
    @import "./config";

    .root {
        display: flex;
        gap: $control-g-padding;
    }
</style>