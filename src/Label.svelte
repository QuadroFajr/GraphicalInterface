<script lang="ts">

</script>

<div class="root">
    <slot />
</div>

<style lang="scss">
    @import "./config";

    .root {
        color: $text-1;
        padding: $control-padding;
        font-family: $font;
        font-size: $size;
    }
</style>