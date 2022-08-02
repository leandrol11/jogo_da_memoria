const grid = document.querySelector(".grid")
const player = document.querySelector(".player")
const timer = document.querySelector(".timer")

const personagens = [
    "beth",
    "jerry",
    "jessica",
    "morty",
    "pessoa-passaro",
    "pickle-rick",
    "rick",
    "summer",
    "meeseeks",
    "scroopy",
]

const criaHtml = (tag, classe) => {
    const elemento = document.createElement(tag)
    elemento.className = classe
    return elemento
}

let primeiraCarta = ""
let segundaCarta = ""

// lógica do jogo
const checaFimDeJogo = () => {
    // conta cartas viradas e encerra o jogo
    const cartasDesabilitadas = document.querySelectorAll(".carta-revelada")
    if (cartasDesabilitadas.length === 20) {
        clearInterval(this.loop)
        setTimeout(() => {
            alert(`Boa, ${player.innerHTML}! Você conseguiu ganhar em ${timer.innerHTML} segundos.`)
            window.location = "posjogo.html"
        }, 300)
    }
}

const checaCarta = () => {
    const primeiroPersonagem = primeiraCarta.getAttribute("data-personagem")
    const segundoPersonagem = segundaCarta.getAttribute("data-personagem")

    //verifica se são iguais e seta para continuar jogo
    if (primeiroPersonagem === segundoPersonagem) {
        primeiraCarta.firstChild.classList.add("carta-revelada")
        segundaCarta.firstChild.classList.add("carta-revelada")
        primeiraCarta = ""
        segundaCarta = ""

        // verificar se o jogo acabou
        checaFimDeJogo()

    } else {
        setTimeout(() => {
            primeiraCarta.classList.remove("revela-carta")
            segundaCarta.classList.remove("revela-carta")
            primeiraCarta = ""
            segundaCarta = ""
        }, 500)
    }
}

const revelaCarta = ({ target }) => {
    // verifica se a carta está virada
    if (target.parentNode.className.includes("revela-carta")) {
        return
    }

    // vira a carta
    if (primeiraCarta === "") {
        target.parentNode.classList.add("revela-carta")
        primeiraCarta = target.parentNode
    } else if (segundaCarta === "") {
        target.parentNode.classList.add("revela-carta")
        segundaCarta = target.parentNode
    }

    // vê se são iguais
    checaCarta()

}

criaCarta = (personagem) => {
    const carta = criaHtml("div", "carta")
    const frontal = criaHtml("div", "frontal")
    const atras = criaHtml("div", "atras")

    frontal.style.backgroundImage = `url(../img/${personagem}.png)`

    carta.appendChild(frontal)
    carta.appendChild(atras)

    carta.addEventListener("click", revelaCarta)

    carta.setAttribute("data-personagem", personagem)

    return carta
}

const carregaJogo = () => {
    const personagensDuplicados = [...personagens, ...personagens]
    const embaralhado = personagensDuplicados.sort(() => Math.random() - 0.5)

    embaralhado.forEach((personagem) => {
        const carta = criaCarta(personagem)
        grid.appendChild(carta)
    })
}

// timer
const tempo = () => {
    this.loop = setInterval(() => {
        const tempoAtual = Number(timer.innerHTML)
        timer.innerHTML = tempoAtual + 1
    }, 1000);
}

window.onload = () => {
    // player
    const nickPlayer = localStorage.getItem("player")
    player.innerHTML = nickPlayer
    tempo()
    carregaJogo()
}


