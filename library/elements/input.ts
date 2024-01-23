export class Input extends HTMLElement {
    private text: string = "";
    private text_editor_rows = document.createElement("div");

    static construct() {
        return document.createElement("tcgi-input") as Input;
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    render_text(old_text: string) {
        // We don't empty the row list because we use insertion rather than re-rendering everything.
        // Options:
        //   - Insert
        //   - Delete
        let len = Math.max(old_text.length, this.text.length);
        let offset = 0;
        console.log("IN", old_text)
        let target = old_text;
        for(let index = 0; index < len; index++) {
            const old_symbol = old_text[index];
            const new_symbol = this.text[index];

            console.log("--- [O=" + old_symbol + "] [N=" + new_symbol + "]");

            if (old_symbol === new_symbol) {
                console.log("  !! Symbol is the same, no changes needed");
                continue;
            }

            // Handle deletion of extra symbols.
            if (old_symbol !== undefined && new_symbol === undefined) {
                console.log("Delete " + old_symbol, index, target);
                target = target.deleteAt(index - offset);
                offset++;
                continue;
            }

            // Insert missing symbols assuming they don't need to be replaced.
            if (old_symbol !== new_symbol) {
                console.log("  !! Inject + " + new_symbol);
                target = target.insert(index, new_symbol);
                offset--;
                continue;
            }
        }

        console.log("TARGET " + target, len);
    }

    set_text(new_text: string) {
        const old_text = this.text;
        this.text = new_text;
        this.render_text(old_text);
        this.shadowRoot.innerHTML = new_text;
    }

    connectedCallback() {
        const settings = this.get_settings_computed();

        // Apply view styles
        this.style.background = settings.color_map.control_background_color;

        this.style.borderColor = settings.color_map.x1_border_color;
        this.style.borderBottomColor = settings.color_map.x0_border_color as any;
        this.style.borderWidth = settings.measure_map.x1_border_width;
        this.style.borderStyle = settings.measure_map.x1_border_style;

        this.shadowRoot.appendChild(this.text_editor_rows);
    }
}