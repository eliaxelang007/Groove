import Uuid, { CompiledUuid } from "../utilities/uuid";

import Compilable from "../interfaces/compilable";
import ValueType from "./value_type";

type CompiledValue = [
    number,
    string,
    CompiledUuid?,
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

    compile = () => [
        this.type,
        this.data.toString(),
        (this.id !== undefined) ?
            this.id.toString() : this.id,
        this.xPosition,
        this.yPosition].filter(item => item !== undefined) as CompiledValue;
}

export { Value as default, CompiledValue };