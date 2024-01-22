import {expand_css_measure} from "../settings";

export class Label extends HTMLElement {
    private text = "";
    private description: null | string = null;
    private text_element = document.createElement("span");
    private description_element = document.createElement("span");
    private text_section = document.createElement("div");
    private image_section = document.createElement("div");
    private icon: null | HTMLElement = null;

    static construct() {
        return document.createElement("tcgi-label") as Label;
    }

    public set_text(new_text: string) {
        this.text = new_text;
        this.text_element.innerText = this.text;
    }

    public set_description(new_description: null | string) {
        const had_description = this.description !== null && new_description == null;
        const adding_description = this.description === null && new_description !== null;

        this.description = new_description;
        this.description_element.innerText = new_description;

        if (had_description) {
            this.description_element.remove();
            return;
        }

        if (adding_description) {
            this.text_section.appendChild(this.description_element);
        }
    }

    public set_icon(icon: HTMLElement | null) {
        const had_icon = this.icon !== null && icon === null;
        const adding_icon = this.icon === null && icon !== null;

        this.icon = icon;
        this.image_section.innerHTML = "";

        if (this.icon !== null) {
            this.image_section.appendChild(this.icon);
        }

        if (had_icon) {
            this.image_section.remove();
            return;
        }

        if (adding_icon) {
            this.shadowRoot.prepend(this.image_section);
        }
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        const settings = this.get_settings_computed();

        // Apply layout styles
        this.style.display = "flex";
        this.style.gap = expand_css_measure(settings.measure_map.control_padding).right;
        this.style.alignItems = "center";
        this.style.justifyContent = "center";

        this.text_section.style.display = "flex";
        this.text_section.style.flexDirection = "column";
        this.text_section.style.gap = expand_css_measure(settings.measure_map.control_padding).top;

        // Apply icon styles
        this.image_section.style.overflow = "hidden";
        this.image_section.style.width = settings.measure_map.icon_width;
        this.image_section.style.height = settings.measure_map.icon_height;
        this.image_section.style.minWidth = settings.measure_map.icon_width;
        this.image_section.style.minHeight = settings.measure_map.icon_height;
        this.image_section.style.display = "flex";
        this.image_section.style.alignItems = "center";
        this.image_section.style.justifyContent = "center";

        // Apply text styles
        this.text_element.style.fontSize = settings.measure_map.x0_text_size;
        this.text_element.style.fontFamily = settings.measure_map.font_family;
        this.text_element.style.color = settings.color_map.x0_handle_color;
        this.text_element.style.userSelect = "none";

        this.description_element.style.fontFamily = settings.measure_map.font_family;
        this.description_element.style.fontSize = settings.measure_map.x1_text_size;
        this.description_element.style.color = settings.color_map.x1_handle_color;
        this.description_element.style.userSelect = "none";

        // Apply always visible text layout
        this.text_section.prepend(this.text_element);
        this.shadowRoot.appendChild(this.text_section);
    }
}