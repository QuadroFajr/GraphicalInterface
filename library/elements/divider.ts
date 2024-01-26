export class Divider extends HTMLElement {
    static construct() {
        return document.createElement("tcgi-divider") as Divider;
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        const settings = this.get_settings_computed();

        this.style.width = settings.measure_map.x1_border_width;
        this.style.height = "100%";
        this.style.background = settings.color_map.x1_border_color;
    }
}