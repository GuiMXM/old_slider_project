import styles from './slider.module.css';
import {useState} from 'react';

//Faz uma chamada p/ API e guarda o retorno em cachedImages
//Renderizar a posição correta da imagem

function Slider() {

    const[code, setCode] = useState();
		
    // cached images already requested to api
    let cachedImages = [];
    // current images show
    let imgs = [];
    const base64 = "data:image/jpeg;base64,"

    function verifyCode(e) {
    		e.preventDefault();
        // recieve event value
        let val = e.target.value;
        // check if value is lower than 16 bits length
        if (val.length < 16){
        	console.log("Code lower than 16 bits.");
        } else {
        	setCode(val);
         	console.log("Code has 16 bits with id=" + code);
        }
    }
    
    async function addImage() {
				console.log("chamando api");
        let apiRes = await fetch("https://swordcraft-image-generator.herokuapp.com/create-image/" + code, {method:"GET"});
        apiRes = await apiRes.json();
        let img = base64 + apiRes.raw_image;
        console.log(img)
        // add requested image to the cached images
        cachedImages.push(img);
        // reorganize images
        imgs.splice(2,0,img);
        console.log(imgs)
    }

		// Components
		function Images() {
         imgs = [
            "https://via.placeholder.com/254x257",
            "https://via.placeholder.com/254x257",
            "https://via.placeholder.com/254x257",
            "https://via.placeholder.com/254x257",
            "https://via.placeholder.com/254x257",
            "https://via.placeholder.com/254x257"
        ];

        return(
            <>
                  <img  src={imgs[0]} alt="imagem aparecerá aqui"></img>
                  <img  src={imgs[1]} alt="imagem aparecerá aqui"></img>
                  <img  src={imgs[2]} alt="imagem aparecerá aqui"></img>
                  <img  src={imgs[3]} alt="imagem aparecerá aqui"></img>
                  <img  src={imgs[4]} alt="imagem aparecerá aqui"></img>
            </>
        )
    }

    return(
        <>
            <div className={styles.mainWrapper}>
                <div className={styles.imgwrapper}> 
	                 <Images/>                 
                </div>          
                               
                <input type="text" maxLength="16" className={styles.code16} onChange={verifyCode}
                  placeholder="     Digite o código aqui"></input>

                <button onClick={addImage}>Enviar</button>
            </div>
        </>
    )
}

export default Slider