<script lang="ts">
    import Button from "./lib/Button.svelte";
    import Frame from "./lib/Frame.svelte";
    import Input from "./lib/Input.svelte";


</script>

<div class="body">
  <Frame>
    <div class="div" slot="titlebar">
      <Input>17.31 BPM</Input>
      <Button>Play this track</Button>
      <Button>Stop everything</Button>
      <Button>Click this</Button>
    </div>
  </Frame>
</div>

<style lang="scss">
  @import "./lib/config.scss";

  .body {
    background: $root;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;

    div {
      display: flex;
      gap: $gap;
    }
  }
</style>