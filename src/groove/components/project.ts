import { Program } from "@typescript-eslint/types/dist/generated/ast-spec";

import StaticImplements from "./utilities/static_implements";

import Compilable from "./interfaces/compilable";
import Buildable from "./interfaces/buildable";

import Target, { CompiledTarget } from "./target";

type CompiledProject = {
    targets: CompiledTarget[]
};


class Project implements Compilable<CompiledProject>, StaticImplements<Buildable<Project, Program>, typeof Project> {
    constructor(
        readonly targets: Target[]
    ) { }

    static fromNode(syntaxTree: Program) {
        return new Project([]);
    }

    compile = () => ({ targets: this.targets.map((target) => target.compile()) });
}

export { Project as default, CompiledProject };