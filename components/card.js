// Card component to demonstrate infinite scrolling
const cardTemplate = document.createElement("template");
cardTemplate.innerHTML = `
    <style>
        .card-container {
            padding: 10px;
        }

        .card-content {
            display: flex;
            flex-direction: column;
            border: 1px solid black;
        } 
        
        .card-content-container {
            margin-bottom: 8px;
            padding: 5px;
        }

        .card-content-container span:last-child {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

    </style>

    <div class="card-container">
        <div class="card-content">
            <div class="card-content-container">
                <span>First Name: </span> 
                <span><slot name="firstname"></slot></span>
            </div>
            <div class="card-content-container">
                <span>Last Name: </span> 
                <span><slot name="lastname"></slot></span>
            </div>
            <div class="card-content-container">
                <span>Age: </span> 
                <span><slot name="age"></slot></span> 
            </div>
            <div class="card-content-container">
                <span>Email: </span> 
                <span><slot name="email"></slot></span>
            </div>
        </div>
    </div>
`;

class Card extends HTMLElement {
    constructor() {
        // inherit all the HTMLElement setup and properties; if not gives an error
        super();

        this.attachShadow({mode: "open"});
        // clone node true for deep clone (clone childrens)
        this.shadowRoot.appendChild(cardTemplate.content.cloneNode(true));
    }

}

window.customElements.define("my-card", Card);