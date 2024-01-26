import {expand_css_measure, Settings} from "../settings";
import {Divider} from "./divider";

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
    private loop_running = true;
    private blink_state = true;
    private timeout = null as any;

    constructor(settings: Settings) {
        this.caret_element = document.createElement("div");

        this.caret_element.style.width = "1px";
        this.caret_element.style.height = "14px";
        this.caret_element.style.background = settings.color_map.x0_handle_color;
        this.caret_element.style.position = "absolute";
        this.caret_element.style.pointerEvents = "none";

        this.looping_blinker();
    }

    looping_blinker() {
        this.blink_state = !this.blink_state;

        if (this.blink_state) {
            this.caret_element.style.opacity = "1";
        } else {
            this.caret_element.style.opacity = "0";
        }

        if (this.loop_running) {
            this.timeout = setTimeout(() => this.looping_blinker(), 500);
        }
    }

    destroy() {
        this.loop_running = false;
        clearTimeout(this.timeout);
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
    private line_label = document.createElement("div");
    private settings: Settings;

    static construct() {
        return document.createElement("tcgi-input") as Input;
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    render_text() {
        this.text_editor_rows.innerHTML = "";
        this.line_label.innerHTML = "";

        const lines = this.text.split("\n");

        lines.forEach((line, index) => {
            const line_element = document.createElement("div");
            const characters = line.split("");

            line_element.style.display = "flex";
            line_element.style.alignItems = "center";
            line_element.style.cursor = "text";
            line_element.style.width = "100%";
            line_element.style.minHeight = "14px";

            const line_tag = document.createElement("div");

            line_tag.innerText = index + "";

            if (this.settings) {
                line_tag.style.fontFamily = this.settings.measure_map.font_family;
                line_tag.style.fontSize = this.settings.measure_map.x0_text_size;
                line_tag.style.height = "30px";
            }

            this.line_label.appendChild(line_tag);

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

                character_element.addEventListener("mousedown", (event) => {
                    const bounding_rect = character_element.getBoundingClientRect();
                    const x_offset = Math.max(0, event.clientX - bounding_rect.x);
                    const mid_horizontal = bounding_rect.width / 2;
                    const next_index_selected = x_offset > mid_horizontal;

                    // TODO: Move caret based on if left or right of symbol
                    console.log(index, char_index);

                    this.text_carets[0].caret_row = index;
                    this.text_carets[0].caret_character = char_index;

                    this.position_caret();
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

            line_element.addEventListener("mousedown", () => {
                if (line_element.children.length === 0) {
                    this.text_carets[0].caret_row = index;
                    this.text_carets[0].caret_character = 0;
                }

                console.debug("Will move to " + index);
                // TODO: Allow text caret positioning function to move to empty lines
            });

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
        let character_row = document.createElement("div");
        Object.keys(this.text_editor_rows.children).forEach((row_index) => {
            const row: HTMLDivElement = this.text_editor_rows.children[row_index];
            const carets_in_row = this.text_carets.filter(c => c.caret_row == +row_index);

            if (this.line_wrap === LineWrap.x0) {
                for (let token_index = 0; token_index < row.children.length; token_index++) {
                    const token = row.children[token_index];
                    // Space characters are the parent whereas the words are in a div.
                    let is_space = false;

                    const potential_space_child = token.children[0];
                    if (potential_space_child === undefined || potential_space_child.innerText == " ") {
                        is_space = true;
                    }

                    if (is_space) {
                        character_row.appendChild(token);
                        this.handle_position(character_row, carets_in_row, +token_index, token);
                    } else {
                        for (let i = 0; i < token.children.length; i++) {
                            character_row.appendChild(token.children[i]);
                        }

                        this.handle_position(character_row, carets_in_row, +token_index, token);
                    }
                }
            } else {
                Object.keys(row.children).forEach((char_index) => {
                    this.handle_position(row, carets_in_row, +char_index, row.children[+char_index] as HTMLElement);
                });
            }
        });
    }

    private handle_position(row: HTMLElement, carets: Caret[], char_index: number, char: HTMLElement) {
        const char_bound = char.getBoundingClientRect();
        const carets_in_column = carets.filter(c => c.caret_character == char_index);

        if (carets_in_column.length == 0) return;
        const caret = carets_in_column[0]; // If they are all in the same place it doesn't make sense to render all of them.
        const container_bound = this.text_editor_rows.getBoundingClientRect();

        const relative_x = char_bound.x - container_bound.x;
        const relative_y = char_bound.y - container_bound.y;

        caret.caret_element.style.left = `${relative_x}px`;
        caret.caret_element.style.height = `${char_bound.height}`;
        caret.caret_element.style.top = `${relative_y}px`;
    }

    connectedCallback() {
        const settings = this.get_settings_computed();
        this.settings = settings;

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
        this.style.userSelect = "none";

        this.text_editor_rows.style.padding = settings.measure_map.control_padding;
        this.text_editor_rows.style.fontFamily = settings.measure_map.font_family;
        this.text_editor_rows.style.fontSize = settings.measure_map.x0_text_size;
        this.text_editor_rows.style.display = "flex";
        this.text_editor_rows.style.flexDirection = "column";
        this.text_editor_rows.style.overflow = "auto";
        this.text_editor_rows.style.gap = expand_css_measure(settings.measure_map.control_padding).top;
        this.text_editor_rows.style.position = "relative";
        this.text_editor_rows.style.flex = "1";

        // Line label style
        this.line_label.style.display = "flex";
        this.line_label.style.flexDirection = "column";
        this.line_label.style.gap = expand_css_measure(settings.measure_map.control_padding).top;
        this.line_label.style.padding = settings.measure_map.control_padding;
        this.line_label.style.overflow = "auto";
        this.line_label.classList.add("no-scroll-bar");

        this.text_editor_rows.addEventListener("scroll", (scroll_event) => {
            this.line_label.scrollTop = this.text_editor_rows.scrollTop;
        });

        // Divider
        const line_label_divider = Divider.construct();

        // Setup interface
        this.shadowRoot.appendChild(this.line_label);
        this.shadowRoot.appendChild(line_label_divider);
        this.shadowRoot.appendChild(this.text_editor_rows);
        this.render_text();

        // Make primary text caret
        const primary_caret = new Caret(settings);
        primary_caret.caret_row = 0;
        primary_caret.caret_character = 0;
        this.add_caret(primary_caret);
        this.position_caret();
    }
}