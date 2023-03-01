"use strict"

import { AxialComponentBase } from "../../../axial/js/core/AxialComponentBase";

class DndContactForm extends AxialComponentBase
{
    
    /** @type { HTMLInputElement } */
    #messageEmail;
    /** @type { HTMLTextAreaElement } */
    #messageText;
    /** @type { HTMLElement } */
    #messageButton;

    #boundMessageButtonClickHandler;

    constructor()
    {
        super();
        console.log("Hello component DndContactForm");
        this.#boundMessageButtonClickHandler = this.messageButtonClickHandler.bind(this);
        this.template = "dnd-contact-form-template";
        
    }

    connectedCallback()
    {
        this.#messageEmail = this.shadowRoot.getElementById("messageEmail");
        this.#messageText = this.shadowRoot.getElementById("messageText");
        this.#messageButton = this.shadowRoot.getElementById("messageButton");
        if( this.#messageButton )
        {
            this.#messageButton.addEventListener("click", this.#boundMessageButtonClickHandler);
        }
        console.log(this.#messageButton);
    }

    messageButtonClickHandler( event )
    {
        console.log("click");
        this.#sendForm();
    }

    async #sendForm()
    {
        try
        {
            const infos = { email: this.#messageEmail.value, text: this.#messageText.value }
            const response = await fetch("./post/mail", { method: "POST", body: JSON.stringify(infos), headers: {"Content-Type": "application/json"} });
            const json = await response.json();
            console.log(json)
        }
        catch(err)
        {
            console.log(err);
        }
    }
}

window.customElements.define("dnd-contact-form", DndContactForm);
export { DndContactForm }