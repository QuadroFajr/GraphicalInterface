<script lang="ts">
    import Divider from "./Divider.svelte";
    import Label from "./Label.svelte";

    export let flex = 0;
    export let width = "";
</script>

<div class="root" style={`
    flex: ${flex};
    ${width ? "width:" + width : ""}
`}>
    <div class="header">
        <div class="navig">
            <div class="left">
                <Label>Application Title</Label>
            </div>
            
            <div class="right">
                <slot name="navigation" />
            </div>
        </div>

        <Divider />

        <div class="config">
            <slot name="config" />
        </div>
    </div>

    <Divider />

    <div class="body">
        <slot />
    </div>

    <Divider />

    <div class="footer">
        <Label>Hello</Label>
        <slot name="footer" />
    </div>
</div>

<style lang="scss">
    @import "./config";

    .root {
        background: $surface-1;
        border: 1px solid $stroke-1;
        border-bottom: 1px solid $stroke-1;
        display: flex;
        flex-direction: column;
       
        .header {
            display: flex;
            background: $surface-0;
            flex-direction: column;
            display: flex;

            .navig, .config {
                padding: $control-g-padding;
                display: flex;
                gap: $control-g-padding;
                flex-direction: row;
                justify-content: space-between;
            }
        }

        .body {
            padding: $control-g-padding;
            display: flex;
            flex-direction: column;
            gap: $control-g-padding;
            flex: 1;
        }

        .footer {
            padding: $control-g-padding;
            background: $surface-0;
        }
    }
</style>