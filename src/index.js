document.addEventListener(`DOMContentLoaded`, e => {
    let id = 0
    const styleTag = document.querySelector(`#style`)
    const defaultStyle = document.querySelector("style")
    const customDiv = document.querySelector(`#custom`)
    const styleForm = document.querySelector(`#style-form`)
    const styleObject = {
        
            height: "300px",
            width: "300px",
            "border-style": "solid",
            "border-width": "30px",
            "border-radius": "0px",
            position: "absolute",
            top:"0",
            bottom: "0",
            left: "0",
            right: "0",
            margin: "auto",
            padding: "0"
    }
    

    document.addEventListener(`change`, e => {
        if (e.target.matches("#border-style")){
            styleObject['border-style'] = e.target.value
            convertStyle(styleObject)
        }
        if (e.target.matches("#text-h-align")){
            styleObject['text-align'] = e.target.value
            convertStyle(styleObject)
        }
        if (e.target.matches("#text-v-align")){
            styleObject['vertical-align'] = e.target.value
            convertStyle(styleObject)
        }
    })

    document.addEventListener('click', e =>{
        
        if(e.target.matches("#border-width-up")){
            styleObject['border-width'] = `${parseInt(styleObject['border-width']) + 5}px`
            convertStyle(styleObject)
        }else if(e.target.matches("#border-width-down")){
            if(parseInt(styleObject['border-width']) > 5 ){
                styleObject['border-width'] = `${parseInt(styleObject['border-width']) - 5}px`
                convertStyle(styleObject)
            }else if(parseInt(styleObject['border-width']) <= 5){
                alert("It's too small b")
            }
        }else if(e.target.matches("#border-radius-up")){
            styleObject['border-radius'] = `${parseInt(styleObject['border-radius']) + 5}%`
            convertStyle(styleObject)
        }else if(e.target.matches("#border-radius-down")){
            console.log(e.target)
            if (parseInt(styleObject['border-radius']) >= 5 ){
                styleObject['border-radius'] = `${parseInt(styleObject['border-radius']) - 5}%`
                convertStyle(styleObject)
            } else if (parseInt(styleObject['border-radius']) <= 5){
                alert("It's too small b")
            }
        }else if(e.target.matches("#padding-width-up")){
            styleObject['padding'] = `${parseInt(styleObject['padding']) + 1}px`
            convertStyle(styleObject)
        }else if(e.target.matches("#padding-width-down")){
            if (parseInt(styleObject['padding']) > 0 ){
                styleObject['padding'] = `${parseInt(styleObject['padding']) - 1}px`
                convertStyle(styleObject)
            }
        }else if(e.target.matches("#height-up")){
            styleObject['height'] = `${parseInt(styleObject['height']) + 1}px`
            convertStyle(styleObject)
        }else if(e.target.matches("#height-down")){
            if (parseInt(styleObject['height']) > 0 ){
                styleObject['height'] = `${parseInt(styleObject['height']) - 1}px`
                convertStyle(styleObject)
            }
        }else if(e.target.matches("#width-up")){
            styleObject['width'] = `${parseInt(styleObject['width']) + 1}px`
            convertStyle(styleObject)
        }else if(e.target.matches("#width-down")){
            if (parseInt(styleObject['width']) > 0 ){
                styleObject['width'] = `${parseInt(styleObject['width']) - 1}px`
                convertStyle(styleObject)
            }
        }
        //     else if(e.target.matches("#margin-width-up")){
        //     if (styleObject['margin'] === `auto`) {
        //         styleObject['margin'] = `30px`
        //         styleObject['margin'] = `${parseInt(styleObject['margin']) + 1}px`
        //         convertStyle(styleObject)
        //     } else {
        //         styleObject['margin'] = `${parseInt(styleObject['margin']) + 1}px`
        //         convertStyle(styleObject)
        //     }
        // }else if(e.target.matches("#margin-width-down")){
        //     if (parseInt(styleObject['margin']) > 0 ){
        //         styleObject['margin'] = `${parseInt(styleObject['margin']) - 1}px`
        //         convertStyle(styleObject)
        //     }
        // }
    })

    document.addEventListener(`submit`, e => {
        e.preventDefault()
        if (e.target.matches(`#border-color`)) {        
            styleObject['border-color'] = e.target.color.value
            convertStyle(styleObject)
        }

        if (e.target.matches(`#background-color`)) {        
            styleObject['background-color'] = e.target.color.value
            convertStyle(styleObject)
        }

        if (e.target.matches(`#color`)) {        
            styleObject['color'] = e.target.color.value
            convertStyle(styleObject)
        }

        if (e.target.matches(`#style-form`)) {
            const object = {
                user_id: id,
                name: e.target.name.value,
                properties: e.target.css.value
            }
            fetch(`http://localhost:3000/styles`, {
                method: `POST`,
                headers: {
                    "content-type": `application/json`,
                    accept: `application/json`
                },
                body: JSON.stringify(object)
            })
            .then(r => r.json())
            .then(styleData => {
                const savedStyleContainer = document.querySelector(`#saved-style-container`)
                const savedStyleDiv = document.createElement(`div`)
                savedStyleDiv.classList.add(`saved-style-div`)
                savedStyleDiv.innerText = styleData.name
                savedStyleContainer.append(savedStyleDiv)
                console.log(styleData.name)
            })
        } 
        if (e.target.matches('#create-account')){
            const CreateUserObj = {
                username: e.target[0].value, 
                password: e.target[1].value
            }
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(CreateUserObj)
            })
            .then(response => response.json())
            .then(response => {
                if(response.username === CreateUserObj.username){
                    const successModal = document.querySelector('#successModal')
                    const successModalContent = document.querySelector('#successModal p')
                    const createUserNameLi = document.querySelector('#create-username-li')
                    const logOutBtn = document.createElement("button")
                    const logoutLi = document.createElement("li")
                    const navUl = document.querySelector("body > div.nav > ul")
                    logoutLi.innerHTML = `<button id="logoutBtn">Logout</button>`
                    id = response.id
                    successModalContent.textContent = `Congrats! the account for ${response.username}, has been created successfully`
                    successModal.style.display = "block"
                    createUserNameLi.innerText = `Welcome ${response.username}`
                    navUl.insertAdjacentElement('beforeend', logoutLi)
                    
                    successModal.addEventListener("click", e => {
                        if(e.target.matches(".close")){
                            successModal.style.display = "none"
                            
                        }
                    })
                }
            })
        }
    })


    const convertStyle = (styleObject) => {
        let bracketString = `{`
        for(const key in styleObject) {
            
            bracketString +=
            ` 
            ${key}: ${styleObject[key]};
            `
        } 
        bracketString += `}`
        styleForm.css.innerText = bracketString
        console.log(bracketString)
        return defaultStyle.innerHTML = `#custom${bracketString}`
    }
    convertStyle(styleObject)
});