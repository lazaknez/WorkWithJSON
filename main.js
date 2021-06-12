let xml =new XMLHttpRequest();

xml.open('get','https://raw.githubusercontent.com/Danilovesovic/zadatak_json/master/data.json');

xml.onreadystatechange = function () {
    if (xml.readyState ==4 && xml.status == 200) {
      document.body.innerHTML =   display(JSON.parse(xml.responseText),"main");
      setClicks();
    }
}
xml.send();

let text = '';

function display(data,className) {
    text += `<ul class=${className}>`
    data.forEach(mainList => {
        (mainList.children.length>0) ? text+=`<li class = "arrow" >${mainList.name}` : text+=`<li class="not_active">${mainList.name}</li>`;
        if (mainList.children.length>0) {
            display(mainList.children[0],"nested");
            
        }
        text+=`</li>`;
    });
    text+= `</ul>`

    return text;
}

function setClicks() {
    let arrows = document.querySelectorAll(".arrow");

    for (let i = 0; i< arrows.length; i++) {
        arrows[i].addEventListener('click',function (event) {
            event.stopPropagation();
            if (!event.target.classList.contains('not_active')) {
                if (event.target.classList.contains('arrow-down')) {
                    let allNested = event.target.querySelectorAll('.nested');
                    for (let i = 0; i <allNested.length; i++) {
                        const nested = allNested[i];
                        nested.classList.remove('active');
                        nested.classList.remove('arrow-down');
                        nested.parentElement.classList.remove('active');
                        nested.parentElement.classList.remove('arrow-down');                        
                    }
                }else{
                    this.querySelector(".nested").classList.toggle('active');
                    this.classList.toggle('arrow-down');
                }
            }
        });
    }


}

