<script lang="ts">
    import Button from "./Button.svelte";
    import ControlBody from "./ControlBody.svelte";
    import Frame from "./Frame.svelte";
    import Group from "./Group.svelte";
    import Label from "./Label.svelte";
</script>

<div class="root">
    <Frame width={"100%"} flex={1}>
		<Button slot="navigation">Exit</Button>
		<Group slot="config">
			<Button>First</Button>
			<Button>Second</Button>
			<Button>Third</Button>
		</Group>

		<div class="row">
			<Button>Action: Generate Free Robux</Button>
			<Button>Action: Generate Free Robux</Button>
			<Button>Action: Generate Free Robux</Button>
			<Button>Action: Generate Free Robux</Button>
			<Button>Action: Generate Free Robux</Button>
		</div>

		<div class="row">
			<Button>Action: Generate Free Robux</Button>
			<Button>Action: Generate Free Robux</Button>
			<Button>Action: Generate Free Robux</Button>
			<Button>Action: Generate Free Robux</Button>
			<Button>Action: Generate Free Robux</Button>
		</div>

		<div class="row">
			<Button>Action: Generate Free Robux</Button>
			<Button>Action: Generate Free Robux</Button>
			<Button>Action: Generate Free Robux</Button>
			<Button>Action: Generate Free Robux</Button>
			<Button>Action: Generate Free Robux</Button>
		</div>

		<ControlBody>
			<Label>Search -></Label>
			<Frame slot="dropdown">
				<Button slot="config">Useless</Button>
				<Label>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga, repudiandae quae! Quos atque tempore animi debitis rerum, sint quis reprehenderit. Praesentium quas aperiam, sint adipisci delectus consequatur omnis suscipit unde laudantium quod earum, ratione rem eum magnam ea? Consequuntur accusamus laudantium ex dolorum suscipit, vero totam cupiditate molestias et ullam, officia eos tempore quam? Porro ipsa, necessitatibus eum quaerat itaque adipisci ea alias! Atque, enim! Vitae, quasi. Voluptatum sunt excepturi ex porro, veritatis nam doloribus similique labore? Quos, odit architecto corrupti consectetur rerum, facere aspernatur dicta suscipit illo quia, amet natus? Ad facere voluptatum quam ratione repudiandae accusantium expedita non.</Label>
			</Frame>
		</ControlBody>
	</Frame>
</div>

<style lang="scss">
	@import "./config";

	.root {
		display: flex;
		background: $surface-0;
		position: fixed;
		flex-direction: column;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		align-items: flex-start;

		.row {
			display: flex;
			gap: $control-g-padding;
		}
	}
</style>