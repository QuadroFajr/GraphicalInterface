import {Button} from "./elements/button";
import {Settings, x0_settings} from "./settings";
import {Computed, Mode} from "./computed";
import {Label} from "./elements/label";

declare global {
    interface Element extends UISettingsMethods {}
    interface HTMLElement extends UISettingsMethods {}
    interface UISettingsMethods {
        __tcgi_internalized_ui_settings__: Computed<Settings>,
        get_settings_computed(): Settings,
        get_settings(): Computed<Settings>,
        set_settings(new_settings: Computed<Settings>): void,
    }
}

export function apply_prototype_extension(target: any) {
    target.prototype.__tcgi_internalized_ui_settings__ = { mode: Mode.Inherit };

    target.prototype.get_settings_computed = function() {
        if (this.__tcgi_internalized_ui_settings__.mode == Mode.Inherit) {
            if (!this.parentNode || typeof this.parentNode.get_settings_computed === "undefined")
                return x0_settings;

            return this.parentNode.get_settings_computed();
        }

        return this.__tcgi_internalized_ui_settings__.value;
    }

    target.prototype.get_settings = function() {
        return this.__tcgi_internalized_ui_settings__;
    }

    target.prototype.set_settings = function(new_settings) {
        this.__tcgi_internalized_ui_settings__ = new_settings;
    }
}

function define(name: string, element: CustomElementConstructor) {
    window.customElements.define(`tcgi-${name}`, element);
}

export function setup_ui() {
    apply_prototype_extension(HTMLElement);
    apply_prototype_extension(Element);
    define("button", Button);
    define("label", Label);
}