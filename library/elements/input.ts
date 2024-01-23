export enum LayoutDirection {
    LeftToRight,
    RighToLeft
}

export class Input extends HTMLElement {
    private text: string = "";
    private text_editor_rows = document.createElement("div");
    private layout_direction = LayoutDirection.LeftToRight;

    static construct() {
        return document.createElement("tcgi-input") as Input;
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    render_text() {
        this.text_editor_rows.innerHTML = "";
        const lines = this.text.split("\n");

        lines.forEach((line) => {
            const line_element = document.createElement("div");
            const characters = line.split("");

            line_element.style.display = "flex";
            line_element.style.height = "14px";
            line_element.style.alignItems = "center";

            characters.forEach((character) => {
                const character_element = document.createElement("pre");
                character_element.innerText = character;

                character_element.style.padding = "0";
                character_element.style.margin = "0";

                character_element.addEventListener("click", (event) => {
                    const bounding_rect = character_element.getBoundingClientRect();
                    const x_offset = Math.max(0, event.clientX - bounding_rect.x);
                    const mid_horizontal = bounding_rect.width / 2;
                    const next_index_selected = x_offset > mid_horizontal;


                });

                line_element.appendChild(character_element);
            });

            this.text_editor_rows.appendChild(line_element);
        });
    }

    set_text(new_text: string) {
        const old_text = this.text;
        this.text = new_text;
        this.render_text();
    }

    connectedCallback() {
        const settings = this.get_settings_computed();

        // Apply view styles
        this.style.background = settings.color_map.control_background_color;

        this.style.borderColor = settings.color_map.x1_border_color;
        this.style.borderBottomColor = settings.color_map.x0_border_color as any;
        this.style.borderWidth = settings.measure_map.x1_border_width;
        this.style.borderStyle = settings.measure_map.x1_border_style;
        this.style.display = "flex";
        this.style.width = "100%";
        this.style.maxWidth = settings.measure_map.input_max_width;
        this.style.minWidth = settings.measure_map.input_min_width;
        this.style.gap = settings.measure_map.panel_gap;

        // Apply text editor area styles
        this.text_editor_rows.style.padding = settings.measure_map.control_padding;
        this.text_editor_rows.style.fontFamily = settings.measure_map.font_family;
        this.text_editor_rows.style.fontSize = settings.measure_map.x0_text_size;
        this.text_editor_rows.style.display = "flex";
        this.text_editor_rows.style.flexDirection = "column";
        this.text_editor_rows.style.gap = settings.measure_map.text_line_gap;

        this.shadowRoot.appendChild(this.text_editor_rows);
    }
}