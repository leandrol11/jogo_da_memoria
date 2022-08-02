const input = document.querySelector(".input-login")
const button = document.querySelector(".botao-login")
const form = document.querySelector(".form-login")

// ativando botão "play"
const validarInput = ({ target }) => {
    if (target.value.length > 2) {
        button.removeAttribute("disabled")
        return
    }
    button.setAttribute("disabled", "")
}

// receber o submit, salvar e redirecionar

const recebeSubmit = (event) => {
    event.preventDefault()
    localStorage.setItem("player", input.value)
    window.location = "jogo.html"
}

input.addEventListener("input", validarInput)
form.addEventListener("submit", recebeSubmit)