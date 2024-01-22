import {setup_ui} from "../library/library";
import {Mode} from "../library/computed";
import {x0_settings} from "../library/settings";
import {Button} from "../library/elements/button";
import {Label} from "../library/elements/label";

const root = document.querySelector(".root");
setup_ui(root);

root.set_settings({
    mode: Mode.Explicit,
    value: x0_settings
});

{
    // Simple button demo test
    const button = Button.construct();
    const label = Label.construct();

    label.set_text("Reload")
    label.set_description("This will reload the current webpage.");

    button.set_label(label);
    root.appendChild(button);

    let val = false;
    button.addEventListener("click", () => {
        val = !val;
        if (val) {
            label.set_description(null);
        } else {
            label.set_description("Hello World");
        }
    })
}

{
    // Another simple button demo test
    const button = Button.construct();
    const label = Label.construct();

    label.set_text("Click this to see temporary message");
    button.set_label(label);

    let val = true;
    button.addEventListener("click", () => {
        val = !val;
        if (val) {
            label.set_description(null);
        } else {
            label.set_description("This description is very long. The purpose is to test and ensure that line wrapping renders correctly and is aesthetically pleasing.");
        }
    })

    const icon = document.createElement("img");
    icon.src = "./logo.svg";
    icon.style.width = "100%";
    label.set_icon(icon);

    button.style.maxWidth = "300px";

    root.appendChild(button);
}
