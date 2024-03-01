<div class="root">
    <div class="non-body">
        <div class="titlebar">
            <slot name="titlebar" />
        </div>
    </div>

    <div class="body">

    </div>
</div>

<style lang="scss">
    @import "./config.scss";

    .root {
        display: flex;
        flex-direction: column;
        width: 100%;

        .non-body {
            display: flex;
            flex-direction: column;
            gap: 1px;
            width: 100%;

            .titlebar {
                display: flex;
                background: $elevated;
                flex: 1;
                padding: $content-padding;
            }
        }
    }
</style>