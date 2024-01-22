export interface BoxMeasure {
    top: string,
    right: string,
    bottom: string,
    left: string
}

export function expand_css_measure(css_value_str: string): BoxMeasure {
    const segments = css_value_str.split(" ");

    if (segments.length === 1) {
        const value = segments[0];
        return {
            top: value,
            right: value,
            bottom: value,
            left: value
        };
    }

    if (segments.length == 2) {
        const vertical = segments[0];
        const horizontal = segments[1];
        return {
            top: vertical,
            bottom: vertical,
            right: horizontal,
            left: horizontal
        };
    }

    if (segments.length == 3) {
        const top = segments[0];
        const horizontal = segments[1];
        const bottom = segments[2];
        return {
            top,
            right: horizontal,
            left: horizontal,
            bottom
        };
    }

    return {
        top: segments[0],
        right: segments[1],
        bottom: segments[2],
        left: segments[3]
    };
}

export interface ColorMap {
    root_background_color: string,
    control_background_color: string,

    attribution_elevated_color: string,
    body_background_elevated_color: string,

    x0_handle_color: string,
    x1_handle_color: string,

    x0_border_color: string,
    x1_border_color: string
}

export interface MeasureMap {
    x0_border_width: string,
    x1_border_width: string,

    x0_border_style: string,
    x1_border_style: string,

    panel_gap: string,
    content_padding: string,
    control_padding: string,
    minimum_button_width: string,

    x0_text_size: string,
    x1_text_size: string,

    font_family: string,
    icon_width: string,
    icon_height: string
}

export enum LightnessCharacter {
    Bright,
    Dark
}

export interface Profile {
    name: string,
    author: string,
    description: string,
    keywords: string[],
    lightness_character: LightnessCharacter,
}

export interface Settings {
    profile: Profile,
    measure_map: MeasureMap,
    color_map: ColorMap
}

/**
 * The general usage measure map for everyday users with 20/20 vision.
 */
const x0_measure_map: MeasureMap = {
    x0_border_width: "3px",
    x1_border_width: "1px",

    x0_border_style: "solid",
    x1_border_style: "solid",

    panel_gap: "1px",
    content_padding: "8px",
    control_padding: "8px 20px",
    minimum_button_width: "120px",

    x0_text_size: "11px",
    x1_text_size: "9px",

    font_family: "JetBrains Mono",
    icon_width: "21px",
    icon_height: "21px"
}

/**
 * A light settings color map for bright environments.
 */
export const x0_color_map: ColorMap = {
    root_background_color: "#DDDDDD",
    control_background_color: "#FFFFFF",

    attribution_elevated_color: "rgba(255, 255, 255, 50%)",
    body_background_elevated_color: "rgba(255, 255, 255, 30%)",

    x0_handle_color: "#000000",
    x1_handle_color: "#555555",

    x0_border_color: "rgba(0, 0, 0, 47%)",
    x1_border_color: "rgba(0, 0, 0, 10%)"
}

/**
 * Profile for the default bright theme.
 */
export const x0_profile: Profile = {
    name: "x0",
    author: "tcgi",
    description: "A bright theme for people with 20/20 vision and in light environments.",
    keywords: ["bright", "light", "default", "generic", "preset", "built-in"],
    lightness_character: LightnessCharacter.Bright
}

/**
 * Default light theme
 */
export const x0_settings: Settings = {
    profile: x0_profile,
    color_map: x0_color_map,
    measure_map: x0_measure_map
}

/**
 * A darker settings color map for dark environments.
 */
// export const x1_color_map: ColorMap = {
//! TODO: Implement dark-settings
// }

/**
 * The measure map for people with slightly blurry vision.
 */
// TODO: Implement blurry vision measures