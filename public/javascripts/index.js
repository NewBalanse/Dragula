window.onload = function () {

    let drake = dragula(
        [
            document.getElementById('left'),
            document.getElementById('right')
        ],
        {
            copy: function (el, source) {
                return source === document.getElementById('right')
            },
            accepts: function (el, target) {
                return target !== document.getElementById('right')
            },
        }
    );

    let btn_Save = document.getElementById('btn');

    btn_Save.addEventListener('click', function () {
        let content = Array.prototype
            .slice
            .call(document.getElementsByClassName('left'));

        let Json = JSON.stringify(HtmlCollectionToArray(content[0]));

        document.getElementById('demo').innerText = Json;

    });
};


/**
 * @return {Array}
 */
function HtmlCollectionToArray(element) {

    let arr = [];

    if (element.children.length !== 0) {
        for (let i = 0; i < element.children.length; i++) {
            arr.push({
                outerHTML: element.children[i].outerHTML,
                localName: element.children[i].localName,
                innerHTML: element.children[i].innerHTML,
                innerText: element.children[i].innerHTML,
                classList: element.children[i].classList.length !== 0 ? getClassNodeList(element.classList) : null,
                className: element.children[i].className,
                children: element.children[i].children.length !== 0 ? HtmlCollectionToArray(element.children[i]) : null,
                type: element.children[i].type !== undefined ? element.children[i].type : null,
                value: element.children[i].value !== undefined ? element.children[i].value : null,
            });
        }

        return arr;
    }

    return null;
}

function getClassNodeList(classList) {
    let array = [];
    for (let i = 0; i < classList.length; i++) {
        array.push(classList[i]);
    }
    return array;
}

