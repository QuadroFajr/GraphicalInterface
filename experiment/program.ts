import {setup_ui} from "../library/library";
import {Mode} from "../library/computed";
import {x0_settings} from "../library/settings";
import {Button} from "../library/elements/button";
import {Label} from "../library/elements/label";
import {Input} from "../library/elements/input";

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

    root.appendChild(info_label);

    // Search label
    const search_label = Label.construct();
    search_label.set_text("Search query");
    search_label.set_description("What would you like to search for through google?");
    root.appendChild(search_label);

    // Search input
    const search_input = Input.construct();
    search_input.set_text("Abc");
    search_input.set_text("Arbc");
    search_input.set_text("X");
    root.appendChild(search_input);

    // Submit control
    const error_message = Label.construct();
    const submit_button = Button.construct();
    {
        const label = Label.construct();
        label.set_text("Search");
        submit_button.set_label(label);
    }

    submit_button.addEventListener("click", () => {
        const icon = document.createElement("img");
        icon.src = "https://www.freeiconspng.com/thumbs/error-icon/error-icon-15.png";
        icon.style.width = "100%";

        error_message.set_icon(icon);
        error_message.set_text("Error: Search not implemented");
        error_message.set_description("There is no implementation for a google scraper or fully functional input system yet.");
        root.prepend(error_message);
    });

    root.appendChild(submit_button);
}