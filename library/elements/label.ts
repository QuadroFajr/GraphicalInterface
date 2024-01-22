export class Label extends HTMLElement {
    private text = "Button with complex label";

    static construct() {
        return document.createElement("tcgi-label") as Label;
    }

    public set_text(new_text: string) {
        this.text = new_text;
        this.shadowRoot.innerHTML = new_text;
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        const settings = this.get_settings_computed();
        this.style.fontSize = settings.measure_map.x1_text_size;
        this.style.fontFamily = "monospace";

        this.shadowRoot.innerHTML = this.text;
    }
}