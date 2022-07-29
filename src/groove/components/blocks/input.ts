import Compilable from "../interfaces/compilable";
import Identifiable from "../interfaces/identifiable";

import Uuid from "../utilities/uuid";
import Value, { CompiledValue } from "../values/value";
import ShadowType from "./shadow_type";

type CompiledInput = [
    number,
    string | CompiledValue,
    (string | CompiledValue)?
];

class Input implements Identifiable, Compilable<CompiledInput> {
    constructor(
        readonly id: string,
        readonly shadowType: ShadowType,
        readonly data: Value | Uuid,
        readonly shadow?: Value | Uuid,
    ) {}

    compile = (): CompiledInput => [this.shadowType, this.data.compile(), (this.shadow !== undefined) ? this.shadow.compile() : this.shadow];
}

export {Input as default, CompiledInput};