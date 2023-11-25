const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','r','s','t','u','w','x','y','z'];

class Background {
    constructor(red=0, green=0, blue=0, opacity=0.25) {
        let background = document.createElement('div');
        background.setAttribute('class','betterjs-background');
        background.setAttribute('style',`position: absolute;top: 0; left: 0;height: 100%; width: 100%;background-color: rgba(${red},${green},${blue},${opacity});display:flex;flex-direction: column;justify-content:center;align-items:center`);
        document.body.appendChild(background);
    }
    getDiv() { return document.querySelector('.betterjs-background'); }
    insertText(text="Sample Text") {
        let div = document.createElement('div');
        let divText = document.createTextNode(text);
        div.appendChild(divText);
        div.setAttribute("class","betterjs-text");
        div.setAttribute("style",'font-family: sans-serif;font-size: 4rem;text-shadow: 0px 0px 10px rgba(10,10,10, 1);color:white;');
        this.getDiv().appendChild(div);
    }
    insertButton(text="Button", onClickEvent) {
        let button = document.createElement('button');
        let buttonText = document.createTextNode(text);
        button.appendChild(buttonText);
        button.setAttribute("class","betterjs-button");
        button.setAttribute("style","padding: 10px 5px;margin-top: 15px;font-size: 1.2rem;");
        button.addEventListener("click",onClickEvent);
        this.getDiv().appendChild(button);
    }
    remove() {
        this.getDiv().remove();
    }
}
Array.prototype.delete = function(index) {
    delete this[index];
    let newArray = [];
    for(let i=0; i<this.length; i++) {
        if(this[i] != undefined) newArray.push(this[i]);
    }
    return newArray;
}
Object.prototype.show = function(display="block") {
    this.style.display = display;
}
Object.prototype.hide = function() {
    this.style.display = 'none';
}
Array.prototype.purgeFromUndefined = function() {
    return this.filter(x => x != undefined);
}