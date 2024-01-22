import {setup_ui} from "../library/library";
import {Button} from "../library/elements/button";
import {x0_settings} from "../library/settings";
import {Computed, Mode} from "../library/computed";

setup_ui();
const root = document.querySelector(".root") as HTMLElement;

const modf = { ...x0_settings };

root.set_settings({
    mode: Mode.Explicit,
    value: {
        color_map: {
            root_background_color: "red"
        },
        measure_map: {
            control_padding: "100px"
        }
    }
});

const btn = Button.construct();
root.appendChild(btn);

const btn2 = Button.construct();
btn2.set_settings({
    mode: Mode.Explicit,
    value: x0_settings
})
root.appendChild(btn2);

let computed: Computed<number> = {
    mode: Mode.Inherit
}