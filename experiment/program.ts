import {setup_ui} from "../library/library";
import {Mode} from "../library/computed";
import {x0_settings} from "../library/settings";
import {Button} from "../library/elements/button";
import {Label} from "../library/elements/label";

// Initialize root of UI interface
const root = document.querySelector(".root");
setup_ui(root);

// Setup interface settings
root.set_settings({
    mode: Mode.Explicit,
    value: x0_settings
});
// TODO: Implement a system to render UI again when theme changes

{
    // Create reload button
    const button = Button.construct();
    const label = Label.construct();

    // Set properties
    label.set_text("Reload");
    label.set_description("Reload this webpage with location.reload()");

    // Setup button
    button.addEventListener("click", () => {
        if (confirm("Are you sure you want to reload this application? Written storage will not be erased.")) {
            location.reload();
        }
    });

    button.set_label(label);
    root.appendChild(button);
}

{
    // Create google search interface

    // Info label
    const info_label = Label.construct();
    info_label.set_text("Google search interface");
    info_label.set_description([
        "This system will allow you to search google on this page in real",
        "time with results as a drop down. This application will scrape",
        "google search results and refine them for viewing."
    ].join(" "));

    info_label.style.maxWidth = "400px";
    root.appendChild(info_label);
}