import Identifiable from "../interfaces/identifiable";
import Compilable from "../interfaces/compilable";

import ScratchOperation from "../operations/operation";

import Keyed, { CompiledKeyed } from "../utilities/keyed";
import Uuid, { CompiledUuid } from "../utilities/uuid";

import Field, { CompiledField } from "../values/field";
import Input, { CompiledInput } from "./input";

type CompiledBlock = {
    opcode: string,
    next: CompiledUuid | null,
    parent: CompiledUuid | null,
    inputs: CompiledKeyed<CompiledInput>,
    fields: CompiledKeyed<CompiledField>,
    shadow: boolean,
    topLevel: boolean,
};

class Block<T extends ScratchOperation> implements Identifiable, Compilable<CompiledBlock> {
    readonly id: Uuid;

    constructor(
        readonly operation: T,
        readonly next: Uuid | null,
        readonly parent: Uuid | null,
        readonly inputs: Keyed<CompiledInput, Input>,
        readonly fields: Keyed<CompiledField, Field>,
        readonly shadow: boolean,
        readonly topLevel: boolean,
    ) {
        this.id = new Uuid();
    }

    compile = (): CompiledBlock => ({
        opcode: ScratchOperation[this.operation],
        next: (this.next !== null) ? this.next.compile() : null,
        parent: (this.parent !== null) ? this.parent.compile() : null,
        inputs: this.inputs.compile(),
        fields: this.fields.compile(),
        shadow: this.shadow,
        topLevel: this.topLevel,
    });
}



export { Block as default, CompiledBlock };