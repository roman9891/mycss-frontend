document.addEventListener(`DOMContentLoaded`, e => {
    const styleTag = document.querySelector(`#style`)
    const customDiv = document.querySelector(`#custom`)
    const styleObject = {
        borderStyle: ``,
        borderColor: ``
    }
    const convertStyle = () => {
        
    }
    const renderStyle = () => {
        
    }

    document.addEventListener(`change`, e => {
        
        if (e.target.matches(`#border-style`)) {
            console.log(e.target.value, styleTag)
            // customDiv.style.borderStyle = e.target.value
        }

        if (e.target.matches(`#border-color`)) {
            console.log(e.target.value, styleTag)
            // customDiv.style.borderColor = e.target.value
        }
    })

    document.addEventListener(`submit`, e => {
        e.preventDefault()
        console.log(e.target.color.value)
        if (e.target.matches(`#border-color`)) {
            console.log(e.target.color.value, styleTag)
            // styleTag.innerHTML = 
            // `
            //     #custom {
            //         border: 1px solid ${e.target.color.value};
            //     }
            // `
        }
        //customDiv.style.borderColor = e.target.color.value
    })
    
    
})