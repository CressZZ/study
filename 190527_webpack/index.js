var test = document.querySelector('.test');

window.addEventListener('click', onTest);

function onTest(){
    import(`./a`);
    console.log(a);
}

