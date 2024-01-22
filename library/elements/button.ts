export class Button extends HTMLElement {
    static construct() {
        return document.createElement("tcgi-button");
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerText = "Hello World";
        const settings = this.get_settings_computed();
        this.style.background = settings.color_map.root_background_color;
        this.style.padding = settings.measure_map.control_padding;
    }
}