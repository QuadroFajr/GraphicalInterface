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

    button.set_label(label);
    root.appendChild(button);
}

{
    // Another simple button demo test
    const button = Button.construct();
    const label = Label.construct();

    label.set_text("Click this to see temporary message");
    button.set_label(label);

    root.appendChild(button);
}
