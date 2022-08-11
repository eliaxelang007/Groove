function partition<T>(array: T[], predicates: Map<string, (item: T) => boolean>) {
    let groups: Record<string, T[]> = Object.fromEntries(
        [...predicates.keys()].map((name) => [name, []])
    );

    const addToGroup = (item: T) => {
        for (const [name, predicate] of predicates.entries()) {

            if (!predicate(item)) continue;

            groups[name].push(item);

            return;
        }
    };

    for (const item of array) {
        addToGroup(item);
    }

    return groups;
}

export default partition;