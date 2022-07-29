import Uuid from "../utilities/uuid";

import Identifiable from "../interfaces/identifiable";
import Compilable from "../interfaces/compilable";

import Operation from "../operations/operation";

import Field, { CompiledField } from "../values/field";

import Input, { CompiledInput } from "./input";
import Keyed, { CompiledKeyed } from "../utilities/keyed";

type CompiledBlock = {
    opcode: string,
    next: string | null,
    parent: string | null,
    inputs: CompiledKeyed<CompiledInput>,
    fields: CompiledKeyed<CompiledField>,
    shadow: boolean,
    topLevel: boolean,
};

class Block implements Identifiable, Compilable<CompiledBlock> {
    constructor(
        readonly id: Uuid,
        readonly operation: Operation,
        readonly next: Uuid | null,
        readonly parent: Uuid | null,
        readonly inputs: Keyed<CompiledInput, Input>,
        readonly fields: Keyed<CompiledField, Field>,
        readonly shadow: boolean,
        readonly topLevel: boolean,
    ) {
    }

    compile = (): CompiledBlock => ({
        opcode: Operation[this.operation],
        next: (this.next !== null) ? this.next.compile() : null,
        parent: (this.parent !== null) ? this.parent.compile() : null,
        inputs: this.inputs.compile(),
        fields: this.fields.compile(),
        shadow: this.shadow,
        topLevel: this.topLevel,
    });
}



export { Block as default, CompiledBlock };