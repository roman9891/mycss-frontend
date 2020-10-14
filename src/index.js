

document.addEventListener(`DOMContentLoaded`, e => {
    let id = 1
    let styleId = 0
    const defaultStyle = document.querySelector("style")
    const styleForm = document.querySelector(`#style-form`)
    
    const renderStyle = styleData => {
        const savedStyleContainer = document.querySelector(`#saved-style-container`)
        const savedStyleDiv = document.createElement(`span`)
        const previewProperties = convertStyleObject(styleData.properties)
        
        savedStyleDiv.classList.add(`saved-style-div`)
        savedStyleDiv.dataset.id = styleData.id
        savedStyleDiv.dataset.name = styleData.name
        savedStyleDiv.dataset.properties = styleData.properties
        savedStyleDiv.dataset.user_id = styleData.user_id
        savedStyleDiv.innerText = !!styleData.name ? styleData.name : `#${styleData.id}`
        savedStyleContainer.append(savedStyleDiv)
        savedStyleDiv.style.border = "3px solid black"
        savedStyleDiv.style["background-color"] = previewProperties["background-color"]
        savedStyleDiv.style["color"] = previewProperties["color"]
        savedStyleDiv.style["border-color"] = previewProperties["border-color"]
    }

    let styleObject = {
        
            height: "300px",
            width: "300px",
            "border-style": "solid",
            "border-width": "1px",
            "border-radius": "0px",
            "background-color": "white",
            "border-color": "black",
            "color": "black",
            position: "relative",
            top:"0",
            bottom: "0",
            left: "0",
            right: "0",
            margin: "0",
            padding: "0"
    }
    
    const defaultStyleObject = styleObject

    const convertStyleObject = (styleObject) => {
        const newObject = {}
        const x = styleObject.split(` `).join(``).slice(1,-1).split(`;`)
        x.forEach(keyValue => {
            let y = keyValue.split(`:`)
            newObject[y[0]] = y[1]
        })
        return newObject
    }
    
    const fetchUser = username => {
        console.log(username, `https://my-css-backend.herokuapp.com/users/${username}`)
        fetch(`https://my-css-backend.herokuapp.com/users/username/${username}`)
        .then(r => r.json())
        .then(userData => renderUserStyles(userData))
    }

    const renderUserStyles = user => {
        console.log(user)
        const savedStyleContainer = document.querySelector("#saved-style-container")
        savedStyleContainer.querySelectorAll("span").forEach(childPoop => childPoop.remove())
        user.styles.forEach(poopyStyle => renderStyle(poopyStyle))
    }

    const login = username => {
        fetch(`https://my-css-backend.herokuapp.com/users/username/${username}`)
        .then(res => res.json())
        .then(user => {
            localStorage['username'] = user.user.username
            localStorage['user_id'] = user.user.id
            const savedStyleContainer = document.querySelector("#saved-style-container")
            savedStyleContainer.querySelectorAll("span").forEach(childPoop => childPoop.remove())
            user.styles.forEach(poopyStyle => renderStyle(poopyStyle))
            checkLogin()
        })
        
    }
    
    const applyFont = fontName => {
        const head = document.querySelector("head")
        head.insertAdjacentHTML('afterbegin',`<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=${fontName}">`)
        styleObject['font-family'] = `${fontName}`
        convertStyle(styleObject)
    }

    function getFontsList(){
        fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCNrAtKTQ6o1tG2YLdGMcz_A5tDfRycRKc")
        .then(response => response.json())
        .then(fonts => {
            fonts.items.forEach(font => {
                const fontFamList = document.querySelector("#font-families")
                fontFamList.innerHTML += `<option value="${font.family}">`
            })
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
    
    const loginSignupOn = () => {
        const loginBtn = document.querySelector("#log-in")
            loginBtn.style.display = "block"
        const signUpbtn = document.querySelector("#sign-up")
            signUpbtn.style.display = "block"
    }

    const change = (parameter, value) => {
        styleObject[parameter] = value
        convertStyle(styleObject)
    }

    document.addEventListener(`change`, e => {
        if (e.target.matches("#border-style")){
            change('border-style', e.target.value)
        }
        if (e.target.matches("#text-h-align")){
            change('text-align', e.target.value)
        }
        if (e.target.matches("#position")){
            change('position', e.target.value)
        }
    })

    const plus = (parameter, value) => {
        console.log(styleObject[parameter], parseInt(styleObject[parameter]),  `${parseInt(styleObject[parameter]) + value}px`)
        styleObject[parameter] = `${parseInt(styleObject[parameter]) + value}px`
        convertStyle(styleObject)
    }
    const minus = (parameter, value) => { 
        if(parseInt(styleObject[parameter]) >= value ){
            styleObject[parameter] = `${parseInt(styleObject[parameter]) - value}px`
            convertStyle(styleObject)
        }else if(parseInt(styleObject[parameter]) < value){
            alert("poopy baby butt")
        }
    }
    

    document.addEventListener('click', e =>{
        if(e.target.matches("#border-width-up")){
            plus('border-width', 5)
        }else if(e.target.matches("#border-width-down")){
            minus('border-width', 5)
        }else if(e.target.matches("#border-radius-up")){
            plus('border-radius', 5)
        }else if(e.target.matches("#border-radius-down")){
            minus('border-radius', 5)
        }else if(e.target.matches("#padding-width-up")){
            plus('padding', 5)
        }else if(e.target.matches("#padding-width-down")){
            minus('padding', 5)
        }else if(e.target.matches("#height-up")){
            plus('height', 5)
        }else if(e.target.matches("#height-down")){
            minus('height', 5)
        }else if(e.target.matches("#width-up")){
            plus('width', 5)
        }else if(e.target.matches("#width-down")){
            minus('width', 5)
        }else if(e.target.matches("#top-up")){
            plus('top', 5)
        }else if(e.target.matches("#top-down")){
            minus('top', 5)
        }else if(e.target.matches("#left-up")){
            plus('left', 5)
        }else if(e.target.matches("#left-down")){
            minus('left', 5)
        }else if(e.target.matches("#margin-width-up")){
            plus('margin', 5)
        } else if(e.target.matches("#margin-width-down")){
            minus('margin', 5)
        }else if(e.target.matches("#logoutBtn")){
            localStorage.clear()
            const savedStyleContainer = document.querySelector("#saved-style-container")
            savedStyleContainer.querySelectorAll("span").forEach(childPoop => childPoop.remove())
            const createUserForm = document.querySelector("#create-account")
            createUserForm.style.display = "none"
            const createdUserName = document.querySelector('#created-user')
            createdUserName.style.display = "none"
            const editAndDeleteButtons = document.querySelectorAll(`.saved-style-buttons`)
            editAndDeleteButtons.forEach(button => button.style.display = `none`)
            styleObject = defaultStyleObject
            convertStyle(styleObject)
            loginSignupOn()

        }else if(e.target.matches("#log-in")){
            const loginForm = document.querySelector("#login-form")
            loginForm.style.display = "block"
            const loginBtn = document.querySelector("#log-in")
            loginBtn.style.display = "none"
            const signUpbtn = document.querySelector("#sign-up")
            signUpbtn.style.display = "none"
            
            checkLogin()
        
        }else if(e.target.matches("#sign-up")){
            const createUserForm = document.querySelector("#create-account")
            createUserForm.style.display = "block"
            const loginBtn = document.querySelector("#log-in")
            loginBtn.style.display = "none"
            const signUpbtn = document.querySelector("#sign-up")
            signUpbtn.style.display = "none"
        }else if(e.target.matches("#saved-style-container > span")){
            defaultStyle.innerHTML = `.custom${e.target.dataset.properties}`
            styleObject = convertStyleObject(e.target.dataset.properties)
            convertStyle(styleObject)
            styleId = e.target.dataset.id
            const editAndDeleteButtons = document.querySelectorAll(`.saved-style-buttons`)
            editAndDeleteButtons.forEach(button => button.style.display = `inline`)
            const styleName = document.querySelector("#style-name-input")
            styleName.value = e.target.dataset.name
        }
        if(e.target.matches("#save-button")){
            const form = document.querySelector("#style-form")

            const object = {
                user_id: id,
                name: form.name.value,
                properties: form.css.value
            }
            fetch(`https://my-css-backend.herokuapp.com/styles`, {
                method: `POST`,
                headers: {
                    "content-type": `application/json`,
                    accept: `application/json`
                },
                body: JSON.stringify(object)
            })
            .then(r => r.json())
            .then(styleData => {renderStyle(styleData);console.log(styleData)})
        } 

        if (e.target.matches('#edit-button')){
            const form = document.querySelector(`#style-form`)
            const name = form.name.value
            const css = form.css.value
            const style = {
                id: styleId,
                name: name,
                properties: css
            }
            fetch(`https://my-css-backend.herokuapp.com/styles/${styleId}`, {
                method: `PATCH`,
                headers: {
                    "content-type": `application/json`,
                    accept: `application/json`
                },
                body: JSON.stringify(style)
            })
            .then(r => r.json())
            .then(setTimeout(() => {fetchUser(localStorage[`username`])}, 500))
        }

        if (e.target.matches('#delete-button')){
            fetch(`https://my-css-backend.herokuapp.com/styles/${styleId}`, {
                method: `DELETE`,
                headers: {"content-type": `application/json`}
            })
            .then(setTimeout(() => {fetchUser(localStorage[`username`])}, 500))
        }
        
    })

    document.addEventListener(`submit`, e => {
        e.preventDefault()
        console.log(e.target)
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

        
        if (e.target.matches('#create-account')){
            const CreateUserObj = {
                username: e.target[0].value, 
                password: e.target[1].value
            }
            fetch('https://my-css-backend.herokuapp.com/users', {
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
                    createdUserName.innerText = `     Welcome ${response.username}`
                    createdUserName.insertAdjacentHTML('afterbegin',logoutBtn)
                    createdUserName.style.display = "block"

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
        if(e.target.matches('#google-font-selection')){
            applyFont(e.target[0].value) 
           
        }
    })
    
   

    const checkLogin = () => {
        console.log('poopybabyman')
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
            createdUserName.innerText = `     Hi ${localStorage['username']}!`
            createdUserName.insertAdjacentHTML('afterbegin',logoutBtn)
            createdUserName.style.display = "block"
            loginBtn.style.display = "none"
            signUpbtn.style.display = "none"
            loginForm.style.display = "none"
            id = localStorage['user_id']
            
            fetch(`https://my-css-backend.herokuapp.com/users/username/${localStorage['username']}`)
            .then(res => res.json())
            .then(user => {
                localStorage['username'] = user.user.username
                localStorage['user_id'] = user.user.id
                console.log(user)
                renderUserStyles(user)
            })  
        }
    }

 
    getFontsList()
    convertStyle(styleObject)
    checkLogin()
    
});

  // function loginSignupoff(){
    //     const loginBtn = document.querySelector("#log-in")
    //         loginBtn.style.display = "none"
    //     const signUpbtn = document.querySelector("#sign-up")
    //         signUpbtn.style.display = "none"
    // }

    // in click
    // if(e.target.matches("#addDiv-up")){
    //     const newCustomDiv = document.createElement(`div`)
    //     const customDivContainer = document.querySelector(`#custom-container`)
        
    //     newCustomDiv.classList.add(`custom`)
    //     customDivContainer.append(newCustomDiv)
    // }
    // if(e.target.matches("#addDiv-down")){

    // }