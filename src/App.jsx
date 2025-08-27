import { useState } from "react";

function App() {
  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProducts, setAddedProducts] = useState([])

  const handleAdd = (p) => {
      const presente = addedProducts.some((e) =>e.Product === p.name )
      if(!presente){
        setAddedProducts([...addedProducts, {Product: p.name, Quantity: 1, Prezzo: p.price}])
      }else{console.log("Prodotto già nel carrello")}
  }


  return (
    <>
    <div className="inpaginazione">
      <div className="prodotti">
        {products.map((p, i) => (
          <div key={i} className="card">
            <div className="card-text">
              <h4>Nome: {p.name}</h4>
              <p><strong>Prezzo:</strong>{p.price} €</p>
            </div>
            <div className="card-buttons">
              <button onClick={() => handleAdd(p)} className="btn bg-green">Aggiungi al carrello</button>
            </div>
          </div>
        ))}
      </div>
      <div className="carrello">
        <p>Carrello</p>
        <ul>
        {addedProducts.map((p, i) => (
          <li key={i}>
            <p>Prodotto: {p.Product}</p>
            <p>Quantità: {p.Quantity}</p>
            <p>Prezzo: {p.Prezzo}</p>
          </li>
        ))}
        </ul>
      </div>
    </div>
    </>
  )
}

export default App
