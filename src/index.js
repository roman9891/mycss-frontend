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
            position: "absolute",
            top:"0",
            bottom: "0",
            left: "0",
            right: "0",
            
            margin: "auto"
        // borderStyle: ``,
        // borderColor: ``
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
   

   
    
    



    function updateDefaultDivShape(defaultSelection){
        if(defaultSelection === "square"){
            styleObject['border-radius'] = '0%'
            defaultStyle.innerHTML =  convertStyle(styleObject)
            
        }else if(defaultSelection === "circle"){
            styleObject['height'] = '300px'
            styleObject['width'] = '300px'
            styleObject['border-radius'] =  '50%'
            defaultStyle.innerHTML = convertStyle(styleObject)
            // `#custom {
            //     height: 300px;
            //     width: 300px;
            //     border-radius: 50%;
            //     border: 20px solid black;
                
            //     position: absolute;
	        //     top:0;
	        //     bottom: 0;
	        //     left: 0;
	        //     right: 0;
                
            //     margin: auto;
            // }`           
            
        // }else if(defaultSelection === "triangle"){
        //     defaultStyle.innerHTML = 
        //     `#custom {
        //         width: 0;
        //         height: 0;
        //         border-left: 250px solid transparent;
        //         border-right: 250px solid transparent;
        //         border-bottom: 250px solid  black;
                
        //         position: absolute;
	    //         top:0;
	    //         bottom: 0;
	    //         left: 0;
	    //         right: 0;
                
        //         margin: auto;
        //     }`    

        }else if(defaultSelection === "rectangle"){
            styleObject['height'] = '150px'
            styleObject['border-radius'] = '0%'
            defaultStyle.innerHTML = convertStyle(styleObject)

        // }else if(defaultSelection === "trapezoid"){
        //     defaultStyle.innerHTML =
        //     `#custom {
        //         height: 0px;
        //         border-bottom: 200px solid black;
	    //         border-left: 300px solid transparent;
	    //         border-right: 300px solid transparent;
        //         width: 150px;
                
        //         position: absolute;
	    //         top:0;
	    //         bottom: 0;
	    //         left: 0;
	    //         right: 0;
                
        //         margin: auto;
        //     }` 

        }
    }
});