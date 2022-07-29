import Uuid from "../utilities/uuid";

import Compilable from "../interfaces/compilable";
import ValueType from "./value_type";

type CompiledValue = [
    number,
    string,
    string?,
    number?,
    number?
];

class Value implements Compilable<CompiledValue> {
    constructor(
        readonly type: ValueType,
        readonly data: number | string,
        readonly id?: Uuid,
        readonly xPosition?: number,
        readonly yPosition?: number,
    ) { }

    compile = (): CompiledValue => [this.type, this.data.toString(), (this.id !== undefined) ? this.id.toString() : this.id, this.xPosition, this.yPosition];
}

export { Value as default, CompiledValue };