// 2. Create a Web Component <tooltip-element> that shows a tooltip when the user hovers.
// <tooltip-element text="Hello, I am a tooltip!">Hover over me</tooltip-element>

const templateTooltip = document.createElement("template");
templateTooltip.innerHTML = `
    <style>

      .tooltip-container {
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 100px;
        width: 100px;
      }

      .content {
        visibility: hidden;
        position: absolute;
        background-color: grey;
        height: 50px;
        width: 100px;
        padding: 10px;
        border: 1px solid;

      }

    </style>

    <div class="tooltip-container">
        <slot></slot>
        <div class="content"></div>
    </div>
`;

class TooltipElement extends HTMLElement {
  constructor() {
    super();

    // shadow DOM
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(templateTooltip.content.cloneNode(true));

    this.tooltipContent = this.shadowRoot.querySelector(".content");
    this.tooltipContainer = this.shadowRoot.querySelector(".tooltip-container");

    // the attributes not full set during the creation so only access attributes in lifecycle methods
    // this.position = this.getAttribute("position");
    // console.log(this.position)

    // have to bind this to ensure this points to tooltip element
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    // this.handleTooltipPosition = this.handleTooltipPosition(this);
  }

  handleMouseEnter(e) {
    if (e.target !== this.tooltipContainer) {
      this.tooltipContent.style.visibility = "visible";
      this.tooltipContent.style.opacity = "1";
      this.handleTooltipPosition();
    }
  }

  handleMouseLeave() {
    this.tooltipContent.style.visibility = "hidden";
    this.tooltipContent.style.opacity = "0";
  }

  handleTooltipPosition() {
    switch (this.getAttribute("position").toLowerCase()) {
      case "top":
        this.tooltipContent.style.bottom = "125%";
        this.tooltipContent.style.left = "50%";
        this.tooltipContent.style.transform = "translateX(-50%)";
        break;
      case "bottom":
        this.tooltipContent.style.top = "125%";
        this.tooltipContent.style.left = "50%";
        this.tooltipContent.style.transform = "translateX(-50%)";
        break;
      case "left":
        this.tooltipContent.style.right = "125%";
        this.tooltipContent.style.top = "50%";
        this.tooltipContent.style.transform = "translateY(-50%)";
        break;
      case "right":
        this.tooltipContent.style.left = "125%";
        this.tooltipContent.style.top = "50%";
        this.tooltipContent.style.transform = "translateY(-50%)";
        break;
      case "default":
        this.tooltipContent.style.bottom = "125%";
        this.tooltipContent.style.left = "50%";
        this.tooltipContent.style.transform = "translateX(-50%)";
        break;
    }
  }

  connectedCallback() {
    // setting the content for tooltip
    const tooltipContent = this.getAttribute("tooltip-content");
    this.tooltipContent.textContent = tooltipContent;
    // adding mouseenter and mouseleave event to show the tooltip
    this.tooltipContainer.addEventListener(
      "mouseenter",
      this.handleMouseEnter,
      true
    );
    this.tooltipContainer.addEventListener("mouseleave", this.handleMouseLeave);
  }

  disconnectedCallback() {
    this.tooltipContainer.removeEventListener(
      "mouseenter",
      this.handleMouseEnter,
      true
    ); // the true is for capture phase (parent to child). Default is bubbling phase (child to parent)
    this.tooltipContainer.removeEventListener(
      "mouseleave",
      this.handleMouseLeave
    );
  }
}

window.customElements.define("tooltip-element", TooltipElement);
