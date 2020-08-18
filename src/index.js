document.addEventListener(`DOMContentLoaded`, e => {
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
            
            margin: "auto"
    }
    

    document.addEventListener(`change`, e => {
        if(e.target.matches("#border-style")){
            styleObject['border-style'] = e.target.value
            convertStyle(styleObject)
        } else if(e.target.matches("#default-shape")){
            updateDefaultDivShape(e.target.value)
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
            console.log(e.target)
            styleObject['border-radius'] = `${parseInt(styleObject['border-radius']) + 5}%`
            console.log(styleObject['border-radius'])
            convertStyle(styleObject)
        }else if(e.target.matches("#border-radius-down")){
            console.log(e.target)
            if (parseInt(styleObject['border-radius']) > 5 ){
                styleObject['border-radius'] = `${parseInt(styleObject['border-radius']) - 5}%`
                convertStyle(styleObject)
            } else if (parseInt(styleObject['border-radius']) <= 5){
                alert("It's too small b")
            }
        }
    })

    document.addEventListener(`submit`, e => {
        e.preventDefault()
        if (e.target.matches(`#border-color`)) {        
            styleObject['border-color'] = e.target.color.value
            convertStyle(styleObject)
        }
        if (e.target.matches(`#style-form`)) {
            console.log(e.target.name.value, e.target.css.value)
            const object = {
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
            .then(data => console.log(data.properties))
        }
    })

    const convertStyle = (styleObject) => {
        let styleString = `#custom{`
        for(const key in styleObject) {
            
            styleString +=
            ` 
            ${key}: ${styleObject[key]};
            `
        } 
        styleString += `}`
        styleForm.css.innerText = styleString
        return defaultStyle.innerHTML = styleString
    }
    convertStyle(styleObject)
});