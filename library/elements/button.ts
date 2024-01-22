import {Label} from "./label";

export class Button extends HTMLElement {
    private label: Label = Label.construct();

    static construct() {
        return document.createElement("tcgi-button") as Button;
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    public set_label(label: Label) {
        this.label = label;
        this.shadowRoot.innerHTML = "";
        this.shadowRoot.appendChild(label);
    }

    connectedCallback() {
        const settings = this.get_settings_computed();

        // Border styles
        this.style.borderWidth = settings.measure_map.x1_border_width;
        this.style.borderStyle = settings.measure_map.x1_border_style;
        this.style.borderColor = settings.color_map.x1_handle_color;

        // Control width
        this.style.minWidth = settings.measure_map.minimum_button_width;

        // Center children
        this.style.display = "flex";
        this.style.alignItems = "center";
        this.style.justifyContent = "center";

        // Mouse over effect
    }
}