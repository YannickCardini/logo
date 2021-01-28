class MyLogo extends HTMLElement {
  html = `
  <div class="logoCard">
    <h3 id="logo">
        My logo
    </h3>
    <div class="container">
    <ul>
      <li>
        <label for="colorPicker">Couleur:</label>
        <input type="color" id="pickColor" value='#FFFFFF' name="colorPicker">
      </li>
      <li>
        <label for="animation">Animation:</label>
        <select name="animation" id="animation">
          <option value="rebond">Rebond</option>
          <option value="shrink">Rétrécissement</option>
          <option value="rotate">Rotation</option>
          <option value="null">Aucune</option>
        </select>
      </li>
      <li>
        <label for="size">Taille:</label>
        <input type="range" id="size" name="size" min="50" max="150" style="margin-top:10%">
      </li>
    <ul>
    </div>
    </div>



    `;
  style = `
    #pickColor {
      margin-left:2%;
    }

    .logoCard {
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
      transition: 0.3s;
      width: 14%;
    }
    
    .logoCard:hover {
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
    
    .container {
      padding: 2px 16px;
    }

    .particle {
      position: absolute;
      width: $d; height: $d;
      animation: shoot 3s ease-out infinite;
      animation-name: shoot, fade;
      
      @for $i from 0 to 400 {
        $t: (1 + .01*random(100))*1s;
        
        &:nth-child(#{$i + 1}) {
          transform: translate(random(100)*1vw, 
                               random(100)*1vh);
          background: hsl(random(360), 100%, 65%);
          animation-duration: $t;
          animation-delay: -.01*random(100)*$t;
        }
      }
    }
    
    @keyframes shoot {
      0% { transform: translate(50vw, 50vh); }
    }
    @keyframes fade { to { opacity: 0 } }

     #logo {
       font-size: 3rem;
        font-weight: bold;
        margin:revert;
        text-align:center;
       -webkit-animation: glow 2s ease-in-out infinite alternate;
       -moz-animation: glow 2s ease-in-out infinite alternate;
       animation: glow 2s ease-in-out infinite alternate;
     }
     
     @-webkit-keyframes glow {
          from {
         text-shadow: 0 0 10px #00fff2, 0 0 20px #00fff2, 0 0 30px #00fff2, 0 0 40px #00fff2, 0 0 50px #00fff2, 0 0 60px #00fff2, 0 0 70px #00fff2, 0 0 90px #00fff2;
       }
       
       to {
         text-shadow: 0 0 20px #00fff2, 0 0 30px #00fff2, 0 0 40px #00fff2, 0 0 50px #00fff2, 0 0 60px #00fff2, 0 0 70px #00fff2, 0 0 80px #00fff2, 0 1 90px #00fff2;
       }
     }`

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `<style>${this.style}</style>` + this.html;
    this.myLogo = this.shadowRoot.querySelector("#logo");
    this.myColor = this.shadowRoot.querySelector("#pickColor");
    this.size = this.shadowRoot.querySelector("#size");
    this.animation = this.shadowRoot.querySelector("#animation");
    this.currAnim = null;

    var _this = this;
    this.myColor.addEventListener('input', function (evt) {
      _this.myLogo.style.color = this.value;
    });
    this.size.addEventListener('input', function (evt) {
      _this.myLogo.style.scale = this.value + "%";
    });
    this.animation.addEventListener('input', function (evt) {
      _this.changeAnimation(this.value);
    });
    this.myLogo.addEventListener("click", () => {
      console.log("Click");
    })
    this.myLogo.style.color = this.getAttribute('couleur');
    this.myLogo.textContent = this.getAttribute('text');
    if (this.hasAttribute("animation"))
      this.changeAnimation(this.getAttribute("animation"))

  }


  changeAnimation(anim) {
    switch (anim) {
      case "rebond":
        if (this.currAnim !== null)
          this.currAnim.cancel();
        this.currAnim = this.myLogo.animate([
          { transform: 'translateY(0px)' },
          { transform: 'translateY(-10px)' },
          { transform: 'translateY(10px)' },
          { transform: 'translateY(0px)' },

        ], {
          duration: 1000,
          iterations: Infinity
        });
        break;

      case "shrink":
        if (this.currAnim !== null)
          this.currAnim.cancel();
        this.currAnim = this.myLogo.animate([
          { scale: 1 },
          { scale: 0 },
        ], {
          duration: 4000,
          iterations: Infinity
        });
        break;

      case "rotate":
        if (this.currAnim !== null)
          this.currAnim.cancel();
        this.currAnim = this.myLogo.animate([
          { transform: 'rotate(360deg)' }

        ], {
          duration: 3000,
          iterations: Infinity,
        });
        break;

      default:
        if (this.currAnim !== null)
          this.currAnim.cancel();
        break;

    }
  }

}

customElements.define("my-logo", MyLogo);
