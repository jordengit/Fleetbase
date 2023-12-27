export declare type PositionalParameters = unknown[];
export declare type NamedParameters = Record<string, unknown>;
export declare type HelperCallback<P extends PositionalParameters = PositionalParameters, N extends NamedParameters = NamedParameters> = (positional: P, named: N) => void;
