export enum Mode {
    Inherit,
    Explicit
}

export interface Inherit {
    mode: Mode.Inherit
}

export interface Explicit<ValueType> {
    mode: Mode.Explicit,
    value: ValueType
}

export type Computed<ValueType> = Explicit<ValueType> | Inherit;