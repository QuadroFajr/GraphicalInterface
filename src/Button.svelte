<script lang="ts">
    import ControlBody from "./ControlBody.svelte";
    import Label from "./Label.svelte";


</script>

<div class="root">
    <ControlBody>
        <div class="background">
            <slot />
        </div>
    </ControlBody>
</div>

<style lang="scss">
    @import "./config";

    .root {
        display: flex;
        align-self: flex-start;

        .background {
            padding: $control-padding;
            cursor: pointer;
            font-family: $font;
            font-size: $size;
            display: flex;
            align-self: flex-start;
            color: #FFF;
        }

        &:hover {
            .background {
                background: $layer-0;
            }
        }
    }
</style>