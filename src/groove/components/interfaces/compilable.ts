interface Compilable<T extends object | string> {
    compile(): T;
}

export default Compilable;