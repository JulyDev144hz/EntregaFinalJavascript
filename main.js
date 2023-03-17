let calculator = document.getElementById("calculator")
let draggable = document.getElementById("draggable")

let moveCalculator = (e) => {
    let top = calculator.offsetTop
    let left = calculator.offsetLeft



    calculator.style.top = top + e.movementY + "px"
    calculator.style.left = left + e.movementX + "px"
    if (top + calculator.offsetHeight > window.innerHeight - 5) {

        calculator.style.top = window.innerHeight - calculator.offsetHeight - 5 + "px"
        draggable.removeEventListener("mousemove", moveCalculator)
    }
    if (left + calculator.offsetWidth > window.innerWidth - 5) {

        calculator.style.left = window.innerWidth - calculator.offsetWidth - 5 + "px"
        draggable.removeEventListener("mousemove", moveCalculator)
    }
    if (top < 5) {

        calculator.style.top = 5 + "px"
        draggable.removeEventListener("mousemove", moveCalculator)
    }
    if (left < 5) {

        calculator.style.left = 5 + "px"
        draggable.removeEventListener("mousemove", moveCalculator)
    }
}


draggable.addEventListener("mousedown", () => {
    document.addEventListener("mousemove", moveCalculator)
})

document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", moveCalculator)
})

const calculatorButtons = document.getElementsByClassName("calculatorButton")
const calculatorInput = document.getElementById("calculatorInput")


for (const btn of calculatorButtons) {
    btn.addEventListener("click", e => {

        if (btn.innerHTML == '=') {
            calculatorInput.value = eval(calculatorInput.value)
        } else if (btn.innerHTML == 'CE') {
            calculatorInput.value = ''
        } else {
            calculatorInput.value += btn.innerHTML

        }

    })
}


// LOGIN

// si no se detecta un usuario logeado se muestra la pagina de login

let logeado = localStorage.getItem("username") ? true : false
let mainPage = document.getElementById("mainPage")
let profileImgNav = document.getElementById("profileImgNav")

const getProfileImages = async () => {

    let data = await fetch("https://rickandmortyapi.com/api/character")

    let json = await data.json()

    let images = []

    json.results.map(character => {
        images.push(character.image)
    })

    return images
}

const setImg = img => {
    localStorage.setItem("ProfileImg", img)

    profileImgNav.setAttribute("src", img)
}

if (localStorage.getItem("students") == undefined) {
    localStorage.setItem("student", JSON.stringify([]))
}

const addStudent = student => {

}


if (!logeado) {
    let loginPage = document.getElementById("loginPage")
    mainPage.style.display = "none"

    loginPage.style.display = "flex"

    let inputLogin = document.getElementById("usernameLogin")

    inputLogin.addEventListener("input", e => {
        let username = inputLogin.value


        let profileImgLogin = document.getElementById("profileImgLogin")
        let profileImg = `https://ui-avatars.com/api/?name=${username.replaceAll(' ', "+")}&background=random&size64px`
        localStorage.setItem("ProfileImg", profileImg)
        profileImgLogin.setAttribute("src", profileImg)

    })

    let buttonLogear = document.getElementById("buttonLogear")


    buttonLogear.addEventListener("click", e => {
        let username = inputLogin.value

        if (username !== "") {
            localStorage.setItem("username", username)

            document.getElementsByClassName("loginBox")[0].style.animation = "loginDisappear 1s forwards"
            setTimeout(() => {
                loginPage.style.display = "none"
                mainPage.style.display = "block"
            }, 2000);
        }


    })
} else {

    let usernameNav = document.getElementById("usernameNav")
    usernameNav.innerHTML = localStorage.getItem("username")

    if (!localStorage.getItem("ProfileImg")) {
        localStorage.setItem("ProfileImg", `https://ui-avatars.com/api/?name=${localStorage.getItem("username").replaceAll(' ', "+")}&background=random&size64px`)
    }
    profileImgNav.setAttribute("src", localStorage.getItem("ProfileImg"))



    let showCalculatorButton = document.getElementById("showCalculatorButton")
    showCalculatorButton.addEventListener("click", () => {
        calculator.classList.toggle("hideCalculator")
    })

    let dropdownImages = document.getElementById("dropdownImages")

    getProfileImages()
        .then(arrImages => {
            arrImages.map(img => {
                dropdownImages.innerHTML += `
                <img src="${img}" onclick="setImg('${img}')"></img>
                `
            })
        })

    profileImgNav.addEventListener("click", e => {
        dropdownImages.style.display = dropdownImages.style.display == "none" ? "flex" : "none"
    })


    let addStudentBtn = document.getElementById("addStudentBtn")


    let buttonAddStudent = document.getElementById("buttonAddStudent")

    buttonAddStudent.addEventListener("click", e => {
        let nombreNewStudent = document.getElementById("nombreNewStudent")
        let trim1NewStudent = document.getElementById("trim1NewStudent")
        let trim2NewStudent = document.getElementById("trim2NewStudent")
        let trim3NewStudent = document.getElementById("trim3NewStudent")

        if (
            nombreNewStudent.value != "" &&
            trim1NewStudent.value != "" &&
            trim2NewStudent.value != "" &&
            trim3NewStudent.value != ""
        ) {
            addStudent({
                "name": nombreNewStudent.value,
                "trim1":trim1NewStudent.value,
                "trim2":trim2NewStudent.value,
                "trim3":trim3NewStudent.value
            })
        } else {
            Toastify({

                text: "Llene el formulario completo",

                duration: 3000,
                close: true,
                gravity: "bottom",
                style: {
                    background: "linear-gradient(to right, #ff507b, #ff2233)",
                  }

            }).showToast();
        }


    })
}
