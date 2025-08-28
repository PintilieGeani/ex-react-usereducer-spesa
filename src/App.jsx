import { useState, useEffect, useReducer } from "react";

function App() {
  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];


  const [totale, setTotale] = useState(0)
  const initialAddedProducts = []
  

  const addedProductsReducer = (state, action) => {
    switch (action.type) {
      case "ADD_PRODUCT":
        const product = action.payload;
        const exist = state.find((e) => e.Product === product.name);

        if (exist) {
          // Se esiste, aumenta la quantità
          return state.map((e) =>
            e.Product === product.name
              ? { ...e, Quantity: e.Quantity + 1 }
              : e
          );
        } else {
          // Altrimenti, aggiungi il prodotto
          return [...state, { Product: product.name, Quantity: 1, Prezzo: product.price }];
        }
      case "REMOVE_PRODUCT":
        return state.filter((e) => e.Product !== action.payload.Product);
      case "UPDATE_QUANTITY":
        return state.map((e) => e.Product === action.payload.Product
          ? { ...e, Quantity: action.payload.Quantity }
          : e
        )
      default: return state
    }


  };

  const [addedProducts, dispatchAddedProducts] = useReducer(addedProductsReducer, initialAddedProducts);

  useEffect(() => {
    const total = addedProducts.reduce((acc, e) => acc + e.Prezzo * e.Quantity, 0);
    setTotale(total);
  }, [addedProducts]);

  const handleAdd = (p) => {
    dispatchAddedProducts({ type: "ADD_PRODUCT", payload: p })
  }

  const handleRemove = (p) => {
    dispatchAddedProducts({ type: "REMOVE_PRODUCT", payload: p })
  }

  const handleQuantity = (p, value) => {
    dispatchAddedProducts({
      type: "UPDATE_QUANTITY",
      payload: { Product: p.Product, Quantity: Number(value) }
    })
  }

  return (
    <>
      <div className="inpaginazione">
        <div className="prodotti">
          <h3 className="titolo gradient-text">Prodotti</h3>
          {products.map((p, i) => (
            <div key={i} className="card">
              <div className="card-text">
                <h4>Nome: {p.name}</h4>
                <p><strong>Prezzo:</strong>{p.price} €</p>
              </div>
              <div className="card-buttons">
                <button onClick={() => handleAdd(p)} className="btn bg">Aggiungi al carrello</button>
              </div>
            </div>
          ))}
        </div>
        <div className="carrello">
          <h3 className="titolo gradient-text">Carrello</h3>
          {addedProducts.map((p, i) => (
            <div className="card" key={i}>
              <div className="card-text">
                <p>Prodotto: {p.Product}</p>
                <p>Quantità: <input className="input"
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
                <p>Prezzo: {p.Prezzo}€</p>
              </div>
              <div className="card-buttons">
                <button className="btn bg" onClick={() => handleRemove(p)}>Rimuovi</button>
              </div>
            </div>
          ))}

          <p className="totale gradient-text">Totale:{totale.toFixed(2)}€</p>
        </div>
      </div>
    </>
  )
}

export default App
