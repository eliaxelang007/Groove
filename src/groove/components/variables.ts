// from typing import Any

// from dataclasses import dataclass, field

// from groove.components.variable import Variable

// from uuid import UUID

// @dataclass(order=True, frozen=True, slots=True)
// class Variables():
//     variables: dict[UUID, Variable[Any]] = field(default_factory=dict)

//     def compile(self):
//         return {f"{id_}": variable.compile() for id_, variable in self.variables.items()}

import Uuid from "../utilities/uuid";
import Variable, { CompiledVariable } from "./variable";

type CompiledVariables =  Record<string, CompiledVariable<any>>;

class Variables implements Compilable<CompiledVariables> {
    constructor(
        readonly variables: Record<string, Variable<any>>
    ) {}

    compile = () => Object.fromEntries(
        Object.entries(this.variables).map(
          ([uuid, variable], _) => [uuid, variable.compile()]
        )
      );
}

export default Variables;