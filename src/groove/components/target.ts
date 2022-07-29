import Keyed, { CompiledKeyed } from "./utilities/keyed";

import ScratchList, { CompiledScratchList } from "./list";
import Variable, { CompiledVariable } from "./variable";
import Block, { CompiledBlock } from "./blocks/block";
import Compilable from "./interfaces/compilable";

type CompiledSpriteCode = {
    variables: CompiledKeyed<CompiledVariable<any>>,
    lists: CompiledKeyed<CompiledScratchList>,
    block: CompiledKeyed<CompiledBlock>
};

class SpriteCode implements Compilable<CompiledSpriteCode> {
    constructor(
        readonly variables: Keyed<CompiledVariable<any>, Variable<any>>,
        readonly lists: Keyed<CompiledScratchList, ScratchList>,
        readonly blocks: Keyed<CompiledBlock, Block>,
    ) {}

    compile = () => ({
        variables: this.variables.compile(),
        lists: this.lists.compile(),
        block: this.blocks.compile()
    });
}

export default SpriteCode;