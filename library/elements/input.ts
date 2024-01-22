export class Input extends HTMLElement {
    static construct() {
        return document.createElement("tcgi-input") as Input;
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        const settings = this.get_settings_computed();
        console.log(settings);
    }
}