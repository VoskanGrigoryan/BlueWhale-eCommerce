const arr = [{ test: 'a' }, { test: 'b' }, { test: 'c' }];

let test1 = arr.findIndex((item) => {
    return item.test === 'b';
});

if (test1 !== -1) arr.splice(test1, 1);

// console.log(arr);

var removeIndex = arr.map((item) => item.test).indexOf('a');

~removeIndex && arr.splice(removeIndex, 1);

console.log(arr);
