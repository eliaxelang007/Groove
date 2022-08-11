import { BaseNode } from "@typescript-eslint/types/dist/generated/ast-spec";

interface Buildable<T, R extends BaseNode> {
    new(...args: any[]): T;
    fromNode(tree: R): T;
}

export default Buildable;