const infiniteScrollTemplate = document.createElement("template");
infiniteScrollTemplate.innerHTML = `
    <style>
        .scroll-container {
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            height: 300px;
            width: 300px;
            border: 1px solid black;
            padding: 2px;
        }
    </style>

    <div class="scroll-container"> 
    </div>
`;

class InfiniteScroll extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild(infiniteScrollTemplate.content.cloneNode(true));

        this.threshold = 100;

        this.container = this.shadowRoot.querySelector(".scroll-container");
        this.handleScroll = this.handleScroll.bind(this);

        // for loading cards
        this.isLoading = false;
        this.cardLoaded = 0;
    }

    loadCards () {
        if (this.cardLoaded > 100) return;

        this.isLoading = true;
        console.log("inside loadCards");
        setTimeout(() => {
            while (this.cardLoaded < 100) {
                const card = document.createElement("my-card");
                card.innerHTML = `
                    <span slot="firstname">John${this.cardLoaded + 1}</span>
                    <span slot="lastname">Doe</span>
                    <span slot="age">${Math.floor(Math.random()*30)+20}</span>
                    <span slot="email">john.doe${this.cardLoaded + 1}@gmail.com</span>
                `;
                const childElement = document.createElement("div");
                childElement.textContent = `Item ${this.cardLoaded + 1}`;;
                this.container.appendChild(card);
                this.cardLoaded++;
            }
            this.isLoading = false;
        }, 1000)
    }

    handleScroll() {
        console.log("inside handle scroll");
        const scrollPosition = this.container.scrollTop;
        const windowHeight = this.container.clientHeight;
        const totalHeight = this.container.scrollHeight;
        console.log(scrollPosition, windowHeight, totalHeight);

        if (totalHeight - (scrollPosition+windowHeight) < this.threshold) {
            this.loadCards();
        }
    }

    

    connectedCallback() {
        console.log("inside connected");
       window.addEventListener("scroll", this.handleScroll);
    }

    disconnectedCallback() {
        window.removeEventListener("scroll", this.handleScroll);
    }
}

window.customElements.define("infinite-scroll", InfiniteScroll);