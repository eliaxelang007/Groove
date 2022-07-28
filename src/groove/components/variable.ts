// from typing import Generic, TypeVar

// from dataclasses import dataclass

// T = TypeVar("T")


// @dataclass(order=True, frozen=True, slots=True)
// class Variable(Generic[T]):
//     name: str
//     value: T
//     is_cloud: bool

//     def compile(self) -> tuple[str, T, bool] | tuple[str, T]:
//         return (self.name, self.value, self.is_cloud) if self.is_cloud else (self.name, self.value)

type CompiledVariable<T> = [string, T, boolean] | [string, T];

class Variable<T> implements Compilable<CompiledVariable<T>> {
    constructor(
        readonly name: string,
        readonly value: T,
        readonly isCloud: boolean,
    ) {}

    compile = (): CompiledVariable<T> => (this.isCloud) ? [this.name, this.value, this.isCloud] : [this.name, this.value];
}

export { Variable as default, CompiledVariable };