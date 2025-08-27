
function App() {
  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];



  return (
    <>
    <div>
      {products.map((p) => (
        <div className="card">
          <h4>Nome: {p.name}</h4>
          <p><strong>Prezzo:</strong> {p.price} </p>
        </div>
      ))}
    </div>

    </>
  )
}

export default App
