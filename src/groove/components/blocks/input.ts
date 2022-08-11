import Identifiable from "../interfaces/identifiable";
import Compilable from "../interfaces/compilable";

import Value, { CompiledValue } from "../values/value";
import Uuid, { CompiledUuid } from "../utilities/uuid";

import ShadowType from "./shadow_type";

type CompiledInput = [
    number,
    CompiledValue | CompiledUuid,
    (CompiledValue | CompiledUuid)?
];

class Input implements Identifiable, Compilable<CompiledInput> {
    constructor(
        readonly id: string,
        readonly shadowType: ShadowType,
        readonly data: Value | Uuid,
        readonly shadow?: Value | Uuid,
    ) { }

    compile = () => [
        this.shadowType,
        this.data.compile(),
        (this.shadow !== undefined) ?
            this.shadow.compile() : this.shadow
    ].filter(item => item !== undefined) as CompiledInput;
}

export { Input as default, CompiledInput };