export class Label extends HTMLElement {
    private text = "";
    private description: null | string = null;
    private text_element = document.createElement("span");
    private description_element = document.createElement("span");

    static construct() {
        return document.createElement("tcgi-label") as Label;
    }

    public set_text(new_text: string) {
        this.text = new_text;
        this.text_element.innerText = this.text;
    }

    public set_description(new_description: null | string) {
        this.description = new_description;
        this.description_element.innerText = new_description;
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        const settings = this.get_settings_computed();
        this.style.fontSize = settings.measure_map.x1_text_size;
        this.style.fontFamily = settings.measure_map.font_family;

        // Create sections for the icon and the label
        const image_section = document.createElement("div");
        const text_section = document.createElement("div");
    }
}