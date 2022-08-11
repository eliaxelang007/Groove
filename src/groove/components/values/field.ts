import Compilable from "../interfaces/compilable";
import Identifiable from "../interfaces/identifiable";
import Uuid, { CompiledUuid } from "../utilities/uuid";

type CompiledField = [
    string,
    CompiledUuid | null,
];

class Field implements Identifiable, Compilable<CompiledField> {
    constructor(
        readonly id: string,
        readonly value: string,
        readonly valueId?: Uuid,
    ) { }

    compile = (): CompiledField => [this.value, (this.valueId !== undefined) ? this.valueId.compile() : null];
}

export { Field as default, CompiledField };