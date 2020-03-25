import { reduce, go, pipe, curry, map, filter, log } from './util';

let products = [
    {name: 'product_1', price: 1000, quantity: 3},
    {name: 'product_2', price: 2000, quantity: 4},
    {name: 'product_3', price: 1500, quantity: 2},
    {name: 'product_4', price: 1200, quantity: 5},
    {name: 'product_5', price: 4200, quantity: 3}
];

const add = (a, b) =>  a + b ;

const sum = curry((f, iter) => go(
    iter,
    map(f),
    reduce(add)
));

// go( products, map(p=>p.quantity), reduce(add), log )

const total_quantity = sum(p => p.quantity);
const total_price = sum(p => p.price);

log('total_quantity :', total_quantity(products), '\ntotal_price : ', total_price(products));