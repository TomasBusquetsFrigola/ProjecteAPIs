/**
 * @typedef {Object} Producte
 * @property {string} id
 * @property {string} title
 * @property {string} discountPercentage
 * @property {number} price
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

/**
 * html = `<div><b>Títol</b><textarea id="textareaTitol" name="textareaTitol" rows="1" cols="50"></textarea></div>`;
    html += `<div><b>Descompte</b><textarea id="textareaDescompte" name="textareaDescompte" rows="1" cols="50"></textarea></div>`;
    html += `<div><button id="aplicarFiltre" onclick="pintarFiltre()">Filtra</button></div>`;

    <label>Títol</label><input type="text" id="titol">
    <label>Descompte</label><input type="text" id="descompte">
 */

function pintarControlsFiltre() {
  let html = "";
  if (!mostrarFiltre) {
    html = `<div><label>Títol</label><input type="text" id="txtTitol"></div>`;
    html += `<div><label>Descompte</label><input type="text" id="txtDescompte"></div>`;
    html += `<div><button id="btnAplicarFiltre">Filtra</button></div>`;
    document.getElementById("divFiltres").innerHTML = html;
    mostrarFiltre = true;

    //Afegim l'event
    document.getElementById("btnAplicarFiltre").onclick = () => {
      let txtTitol = document.getElementById("txtTitol");
      let txtDescompte = document.getElementById("txtDescompte");
      filtrar(txtTitol.value, txtDescompte.value);
    };
  } else {
    html = "";
    document.getElementById("divFiltres").innerHTML = html;
    mostrarFiltre = false;
  }
  // document.getElementById("divFiltres").innerHTML = html;
}

function filtrar(txtTitol, txtDescompte) {
  console.clear();
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((objecte) => {
      let productes = objecte.products;
      let productesFiltrats = [];
      if (txtTitol != "" && txtDescompte != "") {
        let descompteFiltre = Number(txtDescompte);
        productes.forEach(
          /**
           * @param {Producte} producte
           */
          (producte) => {
            let descompteProducte = Number(producte.discountPercentage);
            console.log("Iniciem filtre:");
            if (
              producte.title == txtTitol &&
              descompteProducte < descompteFiltre
            ) {
              productesFiltrats.push(producte);
              console.log(producte);
            }
          },
        );
        pintarTaulaProductes(productesFiltrats);
      } else if (txtTitol != "" && txtDescompte == "") {
        productes.forEach(
          /**
           * @param {Producte} producte
           */
          (producte) => {
            console.log("Iniciem filtre:");
            if (producte.title == txtTitol) {
              productesFiltrats.push(producte);
              console.log(producte);
            }
          },
        );
        pintarTaulaProductes(productesFiltrats);
      } else if (txtTitol == "" && txtDescompte != "") {
        let descompteFiltre = Number(txtDescompte);
        productes.forEach(
          /**
           * @param {Producte} producte
           */
          (producte) => {
            console.log("Iniciem filtre:");
            let descompteProducte = Number(producte.discountPercentage);
            if (descompteProducte < descompteFiltre) {
              productesFiltrats.push(producte);
              console.log(producte);
            }
          },
        );
        pintarTaulaProductes(productesFiltrats);
      } else {
        pintarTaulaProductes(productes);
      }
    });
}

/** MAIN */

let mostrarFiltre = false;

// pintarFiltre();

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

//elements
document.getElementById("btnMostrarFiltre").onclick = (ev) => {
  pintarControlsFiltre();

  let boto = ev.target;
  boto.textContent = "Mostrar Filtre";
  if (mostrarFiltre) {
    boto.textContent = "Amagar Filtre";
  }
};
