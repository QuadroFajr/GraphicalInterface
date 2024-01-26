import {expand_css_measure, Settings} from "../settings";

export enum LayoutDirection {
    LeftToRight,
    RighToLeft
}

export enum Axis {
    Horizontal,
    Vertical
}

class Caret {
    public caret_element: HTMLDivElement;
    public caret_row = 0;
    public caret_character = 0;

    constructor(settings: Settings) {
        this.caret_element = document.createElement("div");

        this.caret_element.style.width = "1px";
        this.caret_element.style.height = "14px";
        this.caret_element.style.background = settings.color_map.x0_handle_color;
        this.caret_element.style.position = "absolute";
    }
}

export enum LineWrap {
    None,
    // Soft wrap
    x0,
    // Hard wrap
    x1
}

export class Input extends HTMLElement {
    private text: string = "";
    private text_editor_rows = document.createElement("div");
    private layout_direction = LayoutDirection.LeftToRight;
    private text_carets: Caret[] = [];
    private line_wrap = LineWrap.x0;

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

        lines.forEach((line, index) => {
            const line_element = document.createElement("div");
            const characters = line.split("");

            line_element.style.display = "flex";
            line_element.style.alignItems = "center";
            line_element.style.cursor = "text";

            const create_character = (character: string, char_index: number) => {
                const character_element = document.createElement("pre");
                character_element.innerHTML = character;
                if (character === " ") {
                    character_element.innerHTML = "&nbsp;";
                }

                character_element.style.padding = "0";
                character_element.style.margin = "0";
                character_element.style.display = "flex";
                character_element.style.alignItems = "center";
                character_element.style.whiteSpace = "pre";
                character_element.style.height = "14px";

                character_element.addEventListener("click", (event) => {
                    const bounding_rect = character_element.getBoundingClientRect();
                    const x_offset = Math.max(0, event.clientX - bounding_rect.x);
                    const mid_horizontal = bounding_rect.width / 2;
                    const next_index_selected = x_offset > mid_horizontal;

                    // TODO: Move caret
                });

                return character_element;
            };

            const create_word_element = () => {
                const element = document.createElement("div");

                element.style.display = "flex";
                element.style.alignItems = "center";
                element.style.whiteSpace = "pre";
                element.style.height = "14px";

                return element;
            };

            if (this.line_wrap == LineWrap.x0) {
                line_element.style.flexFlow = "row wrap";
                let current_word_element = create_word_element();

                characters.forEach((character, char_index) => {
                    const character_element = create_character(character, char_index);

                    if (character === " ") {
                        line_element.appendChild(current_word_element);
                        line_element.appendChild(character_element);

                        current_word_element = create_word_element();
                    } else {
                        current_word_element.appendChild(character_element);
                    }
                });
            } else if (this.line_wrap == LineWrap.x1) {
                line_element.style.flexFlow = "row wrap";

                characters.forEach((character, char_index) => {
                    const character_element = create_character(character, char_index);
                    line_element.appendChild(character_element);
                });
            } else {
                characters.forEach((character, char_index) => {
                    const character_element = create_character(character, char_index);
                    line_element.appendChild(character_element);
                });
            }

            this.text_editor_rows.appendChild(line_element);
        });

        this.text_carets.forEach(caret => {
            this.text_editor_rows.appendChild(caret.caret_element);
        });
    }

    set_text(new_text: string) {
        const old_text = this.text;
        this.text = new_text;
        this.render_text();
    }

    private add_caret(caret: Caret) {
        this.text_carets.push(caret);
        this.text_editor_rows.appendChild(caret.caret_element);

        caret.caret_element.style.top = "0";
        caret.caret_element.style.left = "0";

        this.render_text();
    }

    // This function could have been avoided for a more robust method by separating the text and caret system into its own compoent.
    position_caret() {
        Object.keys(this.text_editor_rows.children).forEach((row_index) => {
            const row: HTMLElement = this.text_editor_rows.children[row_index];
            const carets_in_row = this.text_carets.filter(c => c.caret_row == +row_index);

            Object.keys(row.children).forEach((char_index) => {
                const char = row.children[char_index];
                const char_bound = char.getBoundingClientRect();
                const carets_in_column = carets_in_row.filter(c => c.caret_character == +char_index);

                if (carets_in_column.length == 0) return;
                const caret = carets_in_column[0]; // If they are all in the same place it doesn't make sense to render all of them.
                const container_bound = this.text_editor_rows.getBoundingClientRect();

                const relative_x = char_bound.x - container_bound.x;
                const relative_y = char_bound.y - container_bound.y;

                caret.caret_element.style.left = `${relative_x}px`;
                caret.caret_element.style.height = `${char_bound.height}`;
                caret.caret_element.style.top = `${relative_y}px`;
            });
        });
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
        this.style.userSelect = "none";

        this.text_editor_rows.style.padding = settings.measure_map.control_padding;
        this.text_editor_rows.style.fontFamily = settings.measure_map.font_family;
        this.text_editor_rows.style.fontSize = settings.measure_map.x0_text_size;
        this.text_editor_rows.style.display = "flex";
        this.text_editor_rows.style.flexDirection = "column";
        this.text_editor_rows.style.overflow = "auto";
        this.text_editor_rows.style.gap = expand_css_measure(settings.measure_map.control_padding).top;
        this.text_editor_rows.style.position = "relative";

        // Setup interface
        this.shadowRoot.appendChild(this.text_editor_rows);
        this.render_text();

        // Make primary text caret
        const primary_caret = new Caret(settings);
        primary_caret.caret_row = 5;
        primary_caret.caret_character = 40;
        this.add_caret(primary_caret);
        this.position_caret();
    }
}