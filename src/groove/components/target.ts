import { FunctionDeclaration, VariableDeclaration, VariableDeclarator } from "@typescript-eslint/types/dist/generated/ast-spec";

import Variable, { CompiledVariable, ScratchType } from "./variable";
import ScratchList, { CompiledScratchList } from "./list";

import ScratchOperation from "./operations/operation";
import Block, { CompiledBlock } from "./blocks/block";

import Compilable from "./interfaces/compilable";
import Buildable from "./interfaces/buildable";

import StaticImplements from "./utilities/static_implements";
import Keyed, { CompiledKeyed } from "./utilities/keyed";
import partition from "./utilities/partition";

type CompiledTarget = {
    isStage: boolean,
    variables: CompiledKeyed<CompiledVariable<any>>,
    lists: CompiledKeyed<CompiledScratchList>,
    blocks: CompiledKeyed<CompiledBlock>
};

class Target implements Compilable<CompiledTarget>, StaticImplements<Buildable<Target, FunctionDeclaration>, typeof Target>  {
    constructor(
        readonly isStage: boolean,
        readonly variables: Keyed<CompiledVariable<ScratchType>, Variable<ScratchType>>,
        readonly lists: Keyed<CompiledScratchList, ScratchList>,
        readonly blocks: Keyed<CompiledBlock, Block<ScratchOperation>>,
    ) { }

    static fromNode(functionSource: FunctionDeclaration) {
        const { variableDeclarations, nestedFunctions } = partition(functionSource.body!.body, new Map(
            [
                ["variableDeclarations", (statement) => statement.type === "VariableDeclaration"],
                ["nestedFunctions", (statement) => statement.type === "FunctionDeclaration"]
            ]
        )) as { variableDeclarations: VariableDeclaration[], nestedFunctions: FunctionDeclaration[] };

        const variables = [...(
            function* () {
                for (const declaration of variableDeclarations.map((variable) => variable.declarations)) {
                    yield* declaration;
                }
            }
        )()];

        const { spriteVariables, spriteLists } = partition(variables, new Map(
            [
                ["spriteVariables", (variable) => variable.init!.type == "Literal"],
                ["spriteLists", (variable) => variable.init!.type == "ArrayExpression"]
            ]
        )) as { spriteVariables: VariableDeclarator[], spriteLists: VariableDeclarator[] };

        return new Target(
            functionSource.id!.name === "Stage",
            new Keyed(spriteVariables.map((variable) => Variable.fromNode(variable))),
            new Keyed(spriteLists.map((list) => ScratchList.fromNode(list))),
            new Keyed(nestedFunctions.map((func) => Block.fromNode(func))),
        );
    }

    compile = () => ({
        isStage: this.isStage,
        variables: this.variables.compile(),
        lists: this.lists.compile(),
        blocks: this.blocks.compile()
    });
}

export { Target as default, CompiledTarget };