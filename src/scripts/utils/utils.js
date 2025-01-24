const UI = {
    createElement: function (element, attributes = {}, children = []) {
        if (!element) {
            console.error('No element type provided.');
            return undefined; 
        }
        
        const el = document.createElement(element);
        
        for (const [key, value] of Object.entries(attributes)) {
            el.setAttribute(key, value);
        }
        
        if (!Array.isArray(children)) {
            children = [children]; 
        }

        children.forEach(child => {
            if (typeof child === 'string') {
                el.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                el.appendChild(child); 
            } else {
                console.error('Invalid child element:', child);
                throw new Error('Child must be a string or a Node.');
            }
        });
        
        return el;
    },

    render: function (element, target) {
        const targetElement = document.querySelector(target);
        if (targetElement) {
            targetElement.innerHTML = ''; 
            targetElement.appendChild(element);
        } else {
            console.error(`Target element "${target}" not found.`);
        }
    }
};

export default UI;