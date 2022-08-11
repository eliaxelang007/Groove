import { VariableDeclarator, ArrayExpression, Identifier, Literal } from "@typescript-eslint/types/dist/generated/ast-spec";

import Identifiable from "./interfaces/identifiable";
import Compilable from "./interfaces/compilable";
import Buildable from "./interfaces/buildable";

import StaticImplements from "./utilities/static_implements";
import Uuid from "./utilities/uuid";

import assert from "assert/strict";

type ScratchListType = string[] | number[];

type CompiledScratchList = [string, string[]];

class ScratchList implements Identifiable, StaticImplements<Buildable<ScratchList, VariableDeclarator>, typeof ScratchList>, Compilable<CompiledScratchList> {
    readonly id: Uuid;

    constructor(
        readonly name: string,
        readonly items: ScratchListType
    ) {
        this.id = new Uuid();
    }

    static fromNode(declarator: VariableDeclarator) {
        const elements = ((declarator.init as ArrayExpression).elements as Literal[]).map((element) => element.value);

        const enforceType = (value: any) => assert(value === "string" || value === "number", `Sorry, we don't support variables with the type '${typeof value}' yet.`);

        const firstElement = elements[0];
        enforceType(firstElement);

        for (const element of elements.splice(1)) {
            assert(typeof element == typeof firstElement, "Though Scratch allows arrays that have different typed elements, I'm enforcing that all the elements of a single array should be the same type.");
            enforceType(element);
        }

        return new ScratchList(
            (declarator.id as Identifier).name,
            elements as ScratchListType
        );
    }

    compile = (): CompiledScratchList => [this.name, this.items.map(item => `${item}`)];
}

export { ScratchList as default, CompiledScratchList, ScratchListType };