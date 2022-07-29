import Uuid from "./utilities/uuid";

import Identifiable from "./interfaces/identifiable";
import Compilable from "./interfaces/compilable";

type CompiledScratchList = [string, string[]];

class ScratchList implements Identifiable, Compilable<CompiledScratchList> {
    constructor(
        readonly id: Uuid,
        readonly name: string,
        readonly items: (string | number)[]
    ) {}

    compile = (): CompiledScratchList => [this.name, this.items.map(item => `${item}`)];
}

export { ScratchList as default, CompiledScratchList };