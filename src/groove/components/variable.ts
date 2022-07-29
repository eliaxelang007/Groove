import Uuid from "./utilities/uuid";
import Compilable from "./interfaces/compilable";
import Identifiable from "./interfaces/identifiable";

type CompiledVariable<T> = [string, T, boolean?];

class Variable<T> implements Identifiable, Compilable<CompiledVariable<T>> {
    constructor(
        readonly id: Uuid,
        readonly name: string,
        readonly value: T,
        readonly isCloud: boolean,
    ) {}

    compile = (): CompiledVariable<T> => [this.name, this.value, (this.isCloud) ? this.isCloud : undefined];
}

export { Variable as default, CompiledVariable };