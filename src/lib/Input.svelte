<script lang="ts">
    import ArrowDown from "./ArrowDown.svelte";

    export let value: number | string | boolean = 140;
    export let unit: number = 0;
    export let units = [ "Beats per minute" ]
</script>

<div class="root">
    <div class="panel value">
        { value }
    </div>

    <div class="div"></div>

    <div class="panel unit">
        { units[unit] }
    </div>

    <div class="div"></div>

    <div class="panel dropdown">
        <ArrowDown />
    </div>
</div>

<style lang="scss">
    @import "./config.scss";

    .root {
        display: flex;

        .div {
            width: 1px;
            height: 100%;
            background: $div;
        }

        .value {
            color: $input;
        }

        .unit {
            color: $unit;
        }

        .dropdown {
            padding: $control-small-padding !important;
        }

        .panel {
            font-size: $font-size;
            padding: $control-padding;
            background: $layer;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
                background: $top;
                cursor: pointer;
            }
        }
    }
</style>