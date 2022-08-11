type StaticImplements<I extends new (...args: any[]) => any, C extends I> = InstanceType<C>;

export default StaticImplements;