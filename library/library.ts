import {Button} from "./elements/button";
import {Settings, x0_settings} from "./settings";
import {Computed, Mode} from "./computed";

declare global {
    interface HTMLElement {
        __tcgi_internalized_ui_settings__: Computed<Settings>,
        get_settings_computed(): Settings,
        get_settings(): Computed<Settings>
        set_settings(new_settings: Computed<Settings>): void,
    }
}

function define(name: string, element: CustomElementConstructor) {
    HTMLElement.prototype.__tcgi_internalized_ui_settings__ = { mode: Mode.Inherit };

    HTMLElement.prototype.get_settings_computed = function() {
        if (this.__tcgi_internalized_ui_settings__.mode == Mode.Inherit) {
            if (!this.parentNode)
                return x0_settings;

            return this.parentNode.get_settings_computed();
        }

        return this.__tcgi_internalized_ui_settings__.value;
    }

    HTMLElement.prototype.get_settings = function() {
        return this.__tcgi_internalized_ui_settings__;
    }

    HTMLElement.prototype.set_settings = function(new_settings) {
        this.__tcgi_internalized_ui_settings__ = new_settings;
    }

    window.customElements.define(`tcgi-${name}`, element);
}

export function setup_ui() {
    define("button", Button);
}