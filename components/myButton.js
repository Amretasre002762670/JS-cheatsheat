// 1. Create a simple Web Component <my-button> that renders a button with custom text.
// // Example: Create <my-button text="Click Me"></my-button>
// Requirements:
// It should be reusable.
// It should allow setting the button label via an attribute.

const template = document.createElement('template');
template.innerHTML = `
    <style>
       .button-container {
        padding: 10px;
        
        
       }

       .my-button {
        background-color: green;
        color: white;
        font-size: 10px;
        width: 70px;
        height: 15px;
        padding-bottom: 10px;
        
       }
    </style>
     <div class="button-container">
        <button class="my-button">
        </button>
    </div>
`;

class MyButton extends HTMLElement {

    constructor () {
        super();
        this.attachShadow({mode: 'open'}); // open access from outside
        this.shadowRoot.appendChild(template.content.cloneNode(true)); // template is deep cloned 
    }

    connectedCallback() {
        const button = this.shadowRoot.querySelector(".my-button");
        button.innerText = this.getAttribute('text') || "Default Text";
    }

}

window.customElements.define('my-button', MyButton); // makes my-button available as custom compponent