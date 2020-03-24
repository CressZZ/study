import style from './css/app.css';
import style2 from './css/section.css';

// import img from "url-loader!./img/test.png";
console.log('aaaa')
const styles = document.createElement('link');
styles.setAttribute('rel', 'stylesheet');
styles.setAttribute('href',  '../dist/' + style);
document.head.appendChild(styles)

const styles2 = document.createElement('link');
styles2.setAttribute('rel', 'stylesheet');
styles2.setAttribute('href',  '../dist/' + style2);
document.head.appendChild(styles2)

window.onload=function(){

    console.log(style);
    console.log('aa');
    const divElement = document.createElement('div');
    divElement.innerHTML='test2'
    divElement.className = style['test2'];
    
    console.log(divElement)
    console.log(document.body)
    
    document.body.appendChild(divElement);

    // console.log(img);

    // this.document.querySelector('.image').setAttribute('style', "background: url("+img+")")
}