document.addEventListener(`DOMContentLoaded`, e => {
    const styleTag = document.querySelector(`#style`)
    const defaultStyle = document.querySelector("style")
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
        if(e.target.matches("#border")){

        } else if(e.target.matches("#color")){
            
        } else if(e.target.matches("#default-shape")){
            updateDefaultDivShape(e.target.value)
        }

    })

    document.addEventListener(`submit`, e => {
        e.preventDefault()
        console.log(e.target.color.value)
        if (e.target.matches(`#border-color`)) {
            console.log(e.target.color.value, styleTag)
        }
    })
    
    



    function updateDefaultDivShape(defaultSelection){
        if(defaultSelection === "square"){
            defaultStyle.innerHTML = 
            `#custom {
                height: 300px;
                width: 300px;
                border: 1px solid black;
                
                position: absolute;
	            top:0;
	            bottom: 0;
	            left: 0;
	            right: 0;
                
                margin: auto;
            }`
        }else if(defaultSelection === "circle"){
            defaultStyle.innerHTML = 
            `#custom {
                height: 300px;
                width: 300px;
                border-radius: 50%;
                border: 1px solid black;
                
                position: absolute;
	            top:0;
	            bottom: 0;
	            left: 0;
	            right: 0;
                
                margin: auto;
            }`           
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
            defaultStyle.innerHTML =
            `#custom {
                height: 150px;
                width: 300px;
                border: 1px solid black;
                
                position: absolute;
	            top:0;
	            bottom: 0;
	            left: 0;
	            right: 0;
                
                margin: auto;
            }`  

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