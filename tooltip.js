const template = document.createElement('template');
template.innerHTML=`
    <style>
        .tooltip-container{
            display: inline-block;
            position:relative;
            z-index:2;
        }
        .cancel {
            display:none;
        }

        svg{
            width: 1em;
            cursor: pointer;
        }

        .notify-container{
            position:absolute;
            bottom: 125%;
            z-index:9;
            background = white;
            box-shadow : 5px 5px 10px rgba(0,0,0,0.1);
            font-size: 0.8em;
            border-radius: .5em;
            padding: 1em;
            transform:scale(0);
            transform-origin: bottom left;
            
            -webkit-transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

    </style>

    <div class="tooltip-container">

        <svg  viewBox="0 0 365.696 365.696" xmlns="http://www.w3.org/2000/svg" class="cancel">
            <path id="close" d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0"/>
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.93 16.93" version="1.1" class="alert">
            <path  id="info" d="M8.51,0C3.83-.02.02,3.75+0,8.42c-.02,4.68+3.75,8.49+8.42,8.51+4.68.02+8.49-3.75+8.51-8.42C16.96,3.83+13.18.02+8.51,0Zm-.12,2.28c.41,0+.75.15+1.03.44.29.28.43.63.43,1.04+0+.41-.14.75-.43,1.04-.28.28-.63.42-1.03.42-.42,0-.76-.14-1.05-.42C7.06,4.52+6.91,4.17+6.91,3.76+6.91,3.34+7.06,3+7.35,2.72+7.63,2.43+7.98,2.28+8.39,2.28ZM6,6.07h3.89v7.25h1.17v.93H6V13.32H7.16V7H6Z"/>
        </svg>

        <div class="notify-container">
            <slot name="message" />
        </div>

    </div>
`;



class PopupNotify extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'}); // mode: 'open' => allows us to acces the element via Shadow Root
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    tooltip(state){
        const tooltip= this.shadowRoot.querySelector('.notify-container');
        const alert = this.shadowRoot.querySelector('.alert');
        const cancel = this.shadowRoot.querySelector('.cancel');

        if (state ==true){ // set expanded
            tooltip.style.transform ='scale(1)';
            alert.style.display = 'none';
            cancel.style.display='block';
            state = false;
        } else {
            tooltip.style.transform ='scale(0)';
            alert.style.display = 'block';
            cancel.style.display='none';
            state = false;
        }

    }
    connectedCallback(){
        this.shadowRoot.querySelector('.alert').addEventListener('click', ()=>{
            this.tooltip(true);
        });
        this.shadowRoot.querySelector('.cancel').addEventListener('click', ()=>{
            this.tooltip(false);
        });

        if(this.getAttribute('tip-background')){
            this.shadowRoot.querySelector('.notify-container').style.background= this.getAttribute('tip-background');
        }
    }
}

window.customElements.define('popup-notify', PopupNotify);
