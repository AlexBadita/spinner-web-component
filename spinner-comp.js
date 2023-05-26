const template = document.createElement("template");
template.innerHTML = `
    <style>
        .center {
            z-index: 1000;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: absolute;
            background-color: rgb(255,255,255,0.5);
            visibility: visible;
        }

        .loader {
            width: 48px;
            height: 48px;
            border: 5px solid rgb(255,255,255,0);
            border-bottom-color: #4b9cdb;
            border-radius: 50%;
            display: inline-block;
            box-sizing: border-box;
            animation: rotation 1s linear infinite;
            }
    
            @keyframes rotation {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }

        slot {
            margin-top: 2%;
            display: inline-block;
            text-allign: center;
        }

    </style>

    <div class="center">
        <span class="loader"></span>
        <slot></slot>
    </div>
`;

class SpinnerComp extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));

        window.addEventListener("load", (event) => {
            this.initCircleColor();
            this.initSpinnerColor();
            this.initSize();
            this.initWidth();
            this.initVisibility();
            this.initDuration();
        })
    }

    /* getters */

    get circleColor() {
        const circleColor = this.getAttribute("circleColor");

        if(!this.checkColor(circleColor)) {
            return "rgb(255,255,255,0)";
        }

        return circleColor;
    }

    get spinnerColor() {
        const spinnerColor = this.getAttribute("spinnerColor");
        
        if(!this.checkColor(spinnerColor)) {
            return "#4b9cdb";
        }

        return spinnerColor;
    }

    get visibility() {
        const visibility = this.getAttribute("active");

        if(visibility === "false") {
            return false;
        }
        
        return true;
    }

    get duration() {
        const time = this.getAttribute("duration");

        if(time === null){
            return 0;
        }
        else if(isNaN(time)) {
            return -1;
        }

        return Number(time) * 1000;
    }

    get size() {
        const size = this.getAttribute("size");

        if(size === null || isNaN(size)) {
            return "48";
        }

        return size;
    }

    get width() {
        const width = this.getAttribute("width");

        if(width === null || isNaN(width)) {
            return "5";
        }

        return width;
    }

    /* setters */

    set circleColor(value) {
        if(this.checkColor(value)) {
            this.shadowRoot.querySelector(".loader").style.borderColor = value;
        }
    }

    set spinnerColor(value) {
        if(this.checkColor(value)) {
            this.shadowRoot.querySelector(".loader").style.borderBottomColor = value;
        }
    }

    set duration(value) {
        if(value !== null && !isNaN(value)) {
            this.setAttribute("duration", `${value * 1000}`);
        }
    }

    set size(value) {
        if(value !== null && !isNaN(value)) {
            this.shadowRoot.querySelector(".loader").style.width = value + "px";
            this.shadowRoot.querySelector(".loader").style.height = value + "px";
        }
    }

    set width(value) {
        if(value !== null && !isNaN(value)) {
            this.shadowRoot.querySelector(".loader").style.borderWidth = value + "px";
        }
    }

    /* initializations */

    initCircleColor() {
        this.shadowRoot.querySelector(".loader").style.borderColor = this.circleColor;
    }

    initSpinnerColor() {
        this.shadowRoot.querySelector(".loader").style.borderBottomColor = this.spinnerColor;
    }

    initSize() {
        this.shadowRoot.querySelector(".loader").style.width = this.size + "px";
        this.shadowRoot.querySelector(".loader").style.height = this.size + "px";
    }

    initWidth() {
        this.shadowRoot.querySelector(".loader").style.borderWidth = this.width + "px";
    }

    initVisibility() {
        if(!this.visibility){
            this.hideSpinner();
        }
        else{
            this.showSpinner();
        }
    }

    initDuration() {
        if(this.duration > 0) {
            setTimeout(() => {
                this.hideSpinner();
            }, this.duration);
        }
    }

    /* others */

    checkColor(color) {
        var $div = $("<div>");
        $div.css("border", "1px solid " + color);
        return ($div.css("border-color") != "");
    }

    showSpinner() {
        this.shadowRoot.querySelector(".center").style.visibility = "visible";

        if(this.duration > 0) {
            setTimeout(() => {
                this.hideSpinner();
            }, this.duration);
        }
    }

    hideSpinner() {
        this.shadowRoot.querySelector(".center").style.visibility = "hidden";
    }
}

customElements.define("spinner-comp", SpinnerComp);