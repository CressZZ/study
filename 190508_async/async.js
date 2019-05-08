var test = new Promise((resolve) => { 
    setTimeout(() => { 
        console.log('start'); resolve(1); 
    }, 1000)});

var test2 = new Promise((resolve) => { 
    setTimeout(() => { 
        console.log('start'); resolve(2); 
    }, 2000)});

async function test3() { 
    await Promise.all([test(), test2()]); 
    console.log('end'); 
}

test3();