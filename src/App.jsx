import { useState, useEffect } from "react";

function App() {
  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProducts, setAddedProducts] = useState([])
  const [totale, setTotale] = useState(0)

  useEffect(() => {
    const total = addedProducts.reduce((acc, e) => acc + e.Prezzo * e.Quantity, 0);
    setTotale(total);
  }, [addedProducts]);

  const handleQuantity = (p, value) => {

    const updated = addedProducts.map((e) => e.Product === p.Product
      ? { ...e, Quantity: Number(value) }
      : e)
    setAddedProducts(updated)
  }


  const handleAdd = (p) => {
    const presente = addedProducts.some((e) => e.Product === p.name)
    if (!presente) {
      setAddedProducts([...addedProducts, { Product: p.name, Quantity: 1, Prezzo: p.price }])
      console.log(addedProducts)
    } else {
      const updateProductQuantity = addedProducts.map((e) => e.Product === p.name
        ? { ...e, Quantity: e.Quantity + 1 }
        : e
      )
      setAddedProducts(updateProductQuantity)
    }
  }

  const handleRemove = (p) => {
    const toRemove = addedProducts.filter((e) => e.Product !== p.Product
    )
    setAddedProducts(toRemove)
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
                <p>Quantità: <input
                  type="number"
                  min={1}
                  step={1}
                  value={p.Quantity}
                  onChange={(e) => {
                    const rawValue = e.target.value;
                    if (rawValue === '') {
                      handleQuantity(p, '');
                      return;
                    }
                    const value = parseInt(rawValue, 10);
                    if (isNaN(value) || value < 1) return;
                    handleQuantity(p, value);
                  }}
                  onBlur={() => {
                    if (p.Quantity === '' || p.Quantity < 1) {
                      handleQuantity(p, 1);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (['.', ',', '-', 'e'].includes(e.key)) {
                      e.preventDefault();
                    }
                    // Non permettere lo 0 come primo carattere
                    if (e.key === '0' && e.target.value === '') {
                      e.preventDefault();
                    }
                  }}
                />
                </p>
                <p>Prezzo: {p.Prezzo}</p>
                <button onClick={() => handleRemove(p)}>Rimuovi</button>
              </li>
            ))}
          </ul>
          <p>Totale:{totale.toFixed(2)}€</p>
        </div>
      </div>
    </>
  )
}

export default App
