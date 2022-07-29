import Compilable from "../interfaces/compilable";
import Identifiable from "../interfaces/identifiable";

type CompiledKeyed<T extends object> = Record<string, T>;

class Keyed<T extends object, T2 extends Identifiable & Compilable<T>> implements Compilable<CompiledKeyed<T>> {
    constructor(
        readonly items: T2[]
    ) {}

    compile = () => Object.fromEntries(this.items.map(item => [item.id.toString(), item.compile()]));
}

export {Keyed as default, CompiledKeyed};