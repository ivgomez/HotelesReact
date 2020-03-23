class Hero extends React.Component {
  render() {
    return (
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Hoteles</h1>
            <h2 className="subtitle">
              desde el <strong>{this.props.filters.dateFrom}</strong> hasta el{" "}
              <strong>{this.props.filters.dateTo}</strong>
              {this.props.filters.country &&
                this.props.filters.price > 0 &&
                this.props.filters.rooms > 0 &&
                ` en ${this.props.filters.country} por $${this.props.filters.price} de hasta ${this.props.filters.rooms} habitaciones`}
            </h2>
          </div>
        </div>
      </section>
    );
  }
}

function App() {
  const filters = {
    dateFrom: today.toLocaleDateString(), // Proviene del archivo data.js
    dateTo: new Date(today.valueOf() + 86400000).toLocaleDateString(),
    country: "",
    price: 0,
    rooms: 0
  };
  return (
    <div>
      <Hero filters={filters}></Hero>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
