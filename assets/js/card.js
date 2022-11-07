//coloca a classe show de acordo com o click
const listOptions = document.querySelector(".navgation")

listOptions.addEventListener('click', identify)

function identify(event) {

    const element = event.target

    if (element.tagName == 'LI') {
        const id = element.id

        const choose = document.querySelector(`div[data-id="${id}"]`)

        removeClassShow()

        choose.classList.add("show")

    }
}

//remove a classe 
function removeClassShow() {
    const divs = document.querySelectorAll("body .main div")

    for (let i = 0; i < divs.length; i++) {

        divs[i].classList.remove("show")

    }
}


//mudando a cor do like
let btn = document.getElementById("btnHeart")
let like = document.getElementById("heart")

btn.onclick = () => {
    if (btn.value === "like") {
        like.src = "./assets/img/redLike.png"
        btn.value = "dislike"
    } else {
        like.src = "./assets/img/whiteLike.png"
        btn.value = "like"
    }
}

