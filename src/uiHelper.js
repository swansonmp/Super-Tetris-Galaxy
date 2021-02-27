export default class UIHelper {
    constructor() { }
    
    createElement(spec) {
        let element;
        if (spec.tag == undefined) {
            element = document.createElement("div");
        }
        else {
            element = document.createElement(spec.tag);
        }
        
        if (spec.id != undefined) {
            element.id = spec.id;
        }
        if (spec.class_ != undefined) {
            element.className = spec.class_;
        }
        if (spec.text != undefined) {
            element.textContent = spec.text;
        }
        
        document.getElementById("container").appendChild(element);
        return element;
    }

}
