import { ASTv1 as AST, builders as _builders } from '@glimmer/syntax';
export type QuoteType = '"' | "'";
export interface AnnotatedAttrNode extends AST.AttrNode {
    isValueless?: boolean;
    quoteType?: QuoteType | null;
}
export interface AnnotatedStringLiteral extends AST.StringLiteral {
    quoteType?: QuoteType;
}
export declare function useCustomPrinter(node: AST.BaseNode): boolean;
type ReplaceReturnType<F extends (...a: any) => any, NewReturn> = (...a: Parameters<F>) => NewReturn;
type _Builders = typeof _builders;
export interface Builders extends Omit<_Builders, 'attr' | 'string'> {
    attr: ReplaceReturnType<typeof _builders.attr, AnnotatedAttrNode>;
    string: ReplaceReturnType<typeof _builders.string, AnnotatedStringLiteral>;
}
export declare const builders: Builders;
export {};
//# sourceMappingURL=custom-nodes.d.ts.map