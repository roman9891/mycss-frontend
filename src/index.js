document.addEventListener(`DOMContentLoaded`, e => {
    let id = 1

    const styleTag = document.querySelector(`#style`)
    const defaultStyle = document.querySelector("style")
    const customDiv = document.querySelector(`#custom`)
    const styleForm = document.querySelector(`#style-form`)
    const renderStyle = styleData => {
        const savedStyleContainer = document.querySelector(`#saved-style-container`)
        const savedStyleDiv = document.createElement(`span`)
        savedStyleDiv.classList.add(`saved-style-div`)
        savedStyleDiv.dataset.id = styleData.id
        savedStyleDiv.dataset.name = styleData.name
        savedStyleDiv.dataset.properties = styleData.properties
        savedStyleDiv.innerText = styleData.name
        savedStyleContainer.append(savedStyleDiv)
    }
    const styleObject = {
        
            height: "300px",
            width: "300px",
            "border-style": "solid",
            "border-width": "30px",
            "border-radius": "0px",
            position: "absolute",
            // top:"0",
            // bottom: "0",
            // left: "0",
            // right: "0",
            margin: "0",
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
        // if (e.target.matches("#text-v-align")){
        //     styleObject['vertical-align'] = e.target.value
        //     convertStyle(styleObject)
        // }
        if (e.target.matches("#position")){
            styleObject['position'] = e.target.value
            convertStyle(styleObject)
        }
    })

    document.addEventListener('click', e =>{
        if(e.target.matches("#addDiv-up")){
            const newCustomDiv = document.createElement(`div`)
            const customDivContainer = document.querySelector(`#custom-container`)
            newCustomDiv.classList.add(`custom`)
            customDivContainer.append(newCustomDiv)
            console.log(customDivContainer)
        }
        if(e.target.matches("#addDiv-down")){

        }
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
            styleObject['padding'] = `${parseInt(styleObject['padding']) + 5}px`
            convertStyle(styleObject)
        }else if(e.target.matches("#padding-width-down")){
            if (parseInt(styleObject['padding']) > 0 ){
                styleObject['padding'] = `${parseInt(styleObject['padding']) - 5}px`
                convertStyle(styleObject)
            }
        }else if(e.target.matches("#height-up")){
            styleObject['height'] = `${parseInt(styleObject['height']) + 5}px`
            convertStyle(styleObject)
        }else if(e.target.matches("#height-down")){
            if (parseInt(styleObject['height']) > 0 ){
                styleObject['height'] = `${parseInt(styleObject['height']) - 5}px`
                convertStyle(styleObject)
            }
        }else if(e.target.matches("#width-up")){
            styleObject['width'] = `${parseInt(styleObject['width']) + 5}px`
            convertStyle(styleObject)
        }else if(e.target.matches("#width-down")){
            if (parseInt(styleObject['width']) > 0 ){
                styleObject['width'] = `${parseInt(styleObject['width']) - 5}px`
                convertStyle(styleObject)
            }
        }else if(e.target.matches("#top-up")){
            styleObject['top'] = `${parseInt(styleObject['top']) + 1}px`
            convertStyle(styleObject)
        }else if(e.target.matches("#top-down")){
            if (parseInt(styleObject['top']) > 0 ){
                styleObject['top'] = `${parseInt(styleObject['top']) - 1}px`
                convertStyle(styleObject)
            }
        }else if(e.target.matches("#left-up")){
            styleObject['left'] = `${parseInt(styleObject['left']) + 1}px`
            convertStyle(styleObject)
        }else if(e.target.matches("#left-down")){
            if (parseInt(styleObject['left']) > 0 ){
                styleObject['left'] = `${parseInt(styleObject['left']) - 1}px`
                convertStyle(styleObject)
            }
        }else if(e.target.matches("#margin-width-up")){
                styleObject['margin'] = `${parseInt(styleObject['margin']) + 1}px`
                convertStyle(styleObject)
            } else if(e.target.matches("#margin-width-down")){
                if (parseInt(styleObject['margin']) > 0 ){
                styleObject['margin'] = `${parseInt(styleObject['margin']) - 1}px`
                convertStyle(styleObject)
            }
        }else if(e.target.matches("#logoutBtn")){
            localStorage.clear()
            const savedStyleContainer = document.querySelector("#saved-style-container")
            savedStyleContainer.querySelectorAll("span").forEach(childPoop => childPoop.remove())
            const createUserForm = document.querySelector("#create-account")
            createUserForm.style.display = "none"
            const createdUserName = document.querySelector('#created-user')
            createdUserName.style.display = "none"
            loginSignupOn()

        }else if(e.target.matches("#log-in")){
            const loginForm = document.querySelector("#login-form")
            loginForm.style.display = "block"
            const loginBtn = document.querySelector("#log-in")
            loginBtn.style.display = "none"
            const signUpbtn = document.querySelector("#sign-up")
            signUpbtn.style.display = "none"
        
        }else if(e.target.matches("#sign-up")){
            const createUserForm = document.querySelector("#create-account")
            createUserForm.style.display = "block"
            const loginBtn = document.querySelector("#log-in")
            loginBtn.style.display = "none"
            const signUpbtn = document.querySelector("#sign-up")
            signUpbtn.style.display = "none"
        }
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
            .then(styleData => renderStyle(styleData))
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
                    const createdUserName = document.querySelector('#created-user')
                    const logoutDiv = document.createElement("div")
                    const createUserForm = document.querySelector("#create-account")
                    logoutDiv.setAttribute('id', 'logout')
                    const logoutBtn = logoutDiv.innerHTML = `<button id="logoutBtn">Logout</button>`
                    id = response.id
                    successModalContent.textContent = `Congrats! the account for ${response.username}, has been created successfully`
                    successModal.style.display = "block"
                    createUserForm.style.display = "none"
                    createdUserName.innerText = `Welcome ${response.username}`
                    createdUserName.insertAdjacentHTML('afterbegin',logoutBtn)

                    localStorage['username'] = `${response.username}`
                    
                    
                    successModal.addEventListener("click", e => {
                        if(e.target.matches(".close")){
                            successModal.style.display = "none"
                            
                        }
                    })
                }
            })
        }
        if(e.target.matches("#login-account")){
            login(e.target[0].value)
        }
    })
    
    function checkLogin(){
        
        if(localStorage['username']){
            const createUserForm = document.querySelector("#create-account")
            const createdUserName = document.querySelector('#created-user')
            const loginBtn = document.querySelector("#log-in")
            const signUpbtn = document.querySelector("#sign-up") 
            const logoutDiv = document.createElement("div")
            const loginForm = document.querySelector("#login-form")
            logoutDiv.setAttribute('id', 'logout')
            const logoutBtn = logoutDiv.innerHTML = `<button id="logoutBtn">Logout</button>`
            createUserForm.style.display = "none"
            createdUserName.innerText = `Hi ${localStorage['username']}!`
            createdUserName.insertAdjacentHTML('afterbegin',logoutBtn)
            loginBtn.style.display = "none"
            signUpbtn.style.display = "none"
            loginForm.style.display = "none"
            id = localStorage['user_id']
            
            fetch(`http://localhost:3000/users/username/${localStorage['username']}`)
            .then(res => res.json())
            .then(user => {
                localStorage['username'] = user.user.username
                localStorage['user_id'] = user.user.id
                const savedStyleContainer = document.querySelector("#saved-style-container")
                savedStyleContainer.querySelectorAll("span").forEach(childPoop => childPoop.remove())
                user.styles.forEach(poopyStyle => renderStyle(poopyStyle))
            })
            
        }

    }

    function login(username){
        fetch(`http://localhost:3000/users/username/${username}`)
        .then(res => res.json())
        .then(user => {
            localStorage['username'] = user.user.username
            localStorage['user_id'] = user.user.id
            checkLogin()
            const savedStyleContainer = document.querySelector("#saved-style-container")
            savedStyleContainer.querySelectorAll("span").forEach(childPoop => childPoop.remove())
            user.styles.forEach(poopyStyle => renderStyle(poopyStyle))
        })
        
    }
    
    

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
        return defaultStyle.innerHTML = `.custom${bracketString}`
    }
    
    function loginSignupOn(){
        const loginBtn = document.querySelector("#log-in")
            loginBtn.style.display = "block"
        const signUpbtn = document.querySelector("#sign-up")
            signUpbtn.style.display = "block"
    }

    function loginSignupoff(){
        const loginBtn = document.querySelector("#log-in")
            loginBtn.style.display = "none"
        const signUpbtn = document.querySelector("#sign-up")
            signUpbtn.style.display = "none"
    }

    convertStyle(styleObject)
    checkLogin()
    
});