import { VariableDeclarator, Identifier, Literal } from "@typescript-eslint/types/dist/generated/ast-spec";

import Identifiable from "./interfaces/identifiable";
import Compilable from "./interfaces/compilable";
import Buildable from "./interfaces/buildable";

import StaticImplements from "./utilities/static_implements";
import Uuid from "./utilities/uuid";

import assert from "assert/strict";

type ScratchType = string | number;

type CompiledVariable<T extends ScratchType> = [string, T, boolean?];

class Variable<T extends ScratchType> implements Identifiable,
    StaticImplements<Buildable<Variable<ScratchType>, VariableDeclarator>, typeof Variable<T>>,
    Compilable<CompiledVariable<T>> {

    readonly id: Uuid;

    constructor(
        readonly name: string,
        readonly value: T,
        readonly isCloud: boolean,
    ) {
        this.id = new Uuid();
    }

    static fromNode(declarator: VariableDeclarator) {
        const value = (declarator.init as Literal).value;

        assert(value === "string" || value === "number", `Sorry, we don't support variables with the type '${typeof value}' yet.`);

        return new Variable(
            (declarator.id as Identifier).name,
            value,
            false
        );
    }

    compile = (): CompiledVariable<T> => [
        this.name,
        this.value,
        (this.isCloud) ?
            this.isCloud : undefined
    ].filter(item => item !== undefined) as CompiledVariable<T>;
}

export { Variable as default, CompiledVariable, ScratchType };