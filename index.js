/**
 * @typedef {Object} Producte
 * @property {string} id
 * @property {string} title
 * @property {string} discountPercentage
 */

/**
 *
 * @param {Array} productes
 */
function crearLlistaProductes(productes) {
  let ul = document.createElement("ul");

  productes.forEach((producte, index) => {
    let li = document.createElement("li");
    li.textContent = ` ${producte.id} ${producte.title}`;
    if (producte.discountPercentage >= 15) {
      li.style.backgroundColor = "#FF0000";
    }
    ul.appendChild(li);
  });

  let contenidor = document.getElementById("contenidor");
  contenidor.appendChild(ul);
}

/**
 * @param {Array<Producte>} productes
 */
function pintarTaulaProductes(productes) {
  html = `
  <table border="1">
  <tr>
    <th>ID</th>
    <th>Títol</th>
    <th> % Descompte </th>
  </tr>`;

  productes.forEach(
    /**
     * @param {Producte} element
     */
    (element) => {
      tableElement = `<tr>`;
      tableElement += `<td>${element.id}</td>`;
      tableElement += `<td>${element.title}</td>`;
      tableElement += `<td>${element.discountPercentage}</td>`;
      tableElement += `</tr>`;
      html += tableElement;
    },
  );

  html = html + "</table>";
  document.getElementById("contenidor").innerHTML = html;
}

/** MAIN */

let mostrarFiltre = false;

pintarFiltre();

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((objecte) => {
    console.log(objecte);
    console.log(objecte.products);
    let productes = objecte.products;
    //For per recorrer l'array de productes i obtenir
    //l'id i el títol.
    for (let index = 0; index < productes.length; index++) {
      const producte = productes[index];
      console.log(
        "ID:",
        producte.id,
        "Títol:",
        producte.title,
        "Tipus:",
        typeof producte.discountPercentage,
        "Descompte:",
        producte.discountPercentage,
        "Major",
        producte.discountPercentage > 15,
      );
    }
    pintarTaulaProductes(productes);
  });
