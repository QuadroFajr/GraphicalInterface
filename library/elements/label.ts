export class Label extends HTMLElement {
    static construct() {
        return document.createElement("tcgi-label") as Label;
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        const settings = this.get_settings_computed();

        this.shadowRoot.innerHTML = "Hello"
        console.log(settings);
    }
}