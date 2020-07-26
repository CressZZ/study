const reduce = (f, acc, iter) => {
    if(!iter){
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
        
    }

    for (const a of iter){
        acc = f(a, acc)
    }

    return acc;
}