
/**
 * 
 * @param {Array} productes 
 */
function crearLlistaProductes(productes){
    let ul = document.createElement("ul")
    
    productes.forEach((producte, index) => {
        let li = document.createElement("li")
        li.textContent = ` ${producte.id} ${producte.title}`
        if (producte.discountPercentage >= 15){
            li.style.backgroundColor = "#FF0000"
        }
        ul.appendChild(li)
    })

    let contenidor = document.getElementById("contenidor")
    contenidor.appendChild(ul)
}


fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(objecte => { 
        console.log(objecte)
        console.log(objecte.products)
        let productes = objecte.products
        //For per recorrer l'array de productes i obtenir 
        //l'id i el títol.
        for (let index = 0; index < productes.length; index++) {
            const producte = productes[index];
            console.log("ID:", producte.id, 
                "Títol:", producte.title,
                "Tipus:", typeof(producte.discountPercentage),
                "Descompte:", producte.discountPercentage,
                "Major", producte.discountPercentage > 15)
        }
        crearLlistaProductes(productes)
    });



/*fetch('https://dummyjson.com/test')
    .then(res => res.json())
    .then(objecte => { 
        console.log(objecte)
        console.log("Status del objecte:", objecte.status)
        console.log("Method del objecte:", objecte.method) 
    });*/


