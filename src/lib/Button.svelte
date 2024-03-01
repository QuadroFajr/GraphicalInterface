<div class="root">
    <slot />
</div>

<style lang="scss">
    @import "./config.scss";

    .root {
        background: $layer;
        padding: $control-padding;
        font-size: $font-size;
        display: flex;
        align-self: flex-start; 
        color: $action;
        cursor: pointer;

        &:hover {
            background: $top;
        }
    }
</style>