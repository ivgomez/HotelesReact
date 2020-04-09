class Hero extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Hoteles</h1>
            <h2 className="subtitle">
              desde el <strong>{this.props.filters.dateFrom}</strong> hasta el{" "}
              <strong>{this.props.filters.dateTo}</strong>
              {`${this.props.filters.country ? ` en ${this.props.filters.country}` : ""}`}
              {`${this.props.filters.price > 0 ? ` por $${this.props.filters.price}` : ""}`}
              {`${this.props.filters.rooms > 0 ? ` de hasta ${this.props.filters.rooms} habitaciones` : ""}`}
            </h2>
          </div>
        </div>
      </section>
    );
  }
}

class DateFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(event) {
    this.props.onDateChange(event);
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  render() {
    return (
      <div className="field">
        <div className="control has-icons-left">
          <input
            className="input"
            type="date"
            onChange={this.handleDateChange}
            value={this.formatDate(this.props.date)}
            name={this.props.name}
          />
          <span className="icon is-small is-left">
            <i className={`fas fa-${this.props.icon}`}></i>
          </span>
        </div>
      </div>
    );
  }
}

class OptionsFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handlerOptionsFilterChange = this.handlerOptionsFilterChange.bind(this);
  }

  handlerOptionsFilterChange(event) {
    this.props.onOptionChange(event);
  }

  render() {
    return (
      <div className="field">
        <div className="control has-icons-left">
          <div className="select" style={{ width: "100%" }}>
            <select
              style={{ width: "100%" }}
              name={this.props.name}
              onChange={this.handlerOptionsFilterChange}
              value={this.props.selected}
            >
              {this.props.options.map((option) => (
                <option value={option.value}>{option.name}</option>
              ))}
              ;
            </select>
          </div>
          <div className="icon is-small is-left">
            <i className={`fas fa-${this.props.icon}`}></i>
          </div>
        </div>
      </div>
    );
  }
}

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }
  handleOptionChange(event) {
    let payload = this.props.filters;
    payload[event.target.name] = event.target.value;
    this.props.onFilterChange(payload);
  }

  render() {
    return (
      <nav className="navbar is-info" style={{ justifyContent: "center" }}>
        <div className="navbar-item">
          <DateFilter
            date={this.props.filters.dateFrom}
            name="dateFrom"
            onDateChange={this.handleOptionChange}
            icon="sign-in-alt"
          />
        </div>
        <div className="navbar-item">
          <DateFilter
            date={this.props.filters.dateTo}
            name="dateTo"
            onDateChange={this.handleOptionChange}
            icon="sign-out-alt"
          />
        </div>
        <div className="navbar-item">
          <OptionsFilter
            options={[
              { value: "", name: "Todos los países" },
              { value: "Argentina", name: "Argentina" },
              { value: "Brasil", name: "Brasil" },
              { value: "Chile", name: "Chile" },
              { value: "Uruguay", name: "Uruguay" },
            ]}
            onOptionChange={this.handleOptionChange}
            selected={this.props.filters.country}
            name="country"
            icon="globe"
          />
        </div>
        <div className="navbar-item">
          <OptionsFilter
            options={[
              { value: "", name: "Cualquier precio" },
              { value: 1, name: "$" },
              { value: 2, name: "$$" },
              { value: 3, name: "$$$" },
              { value: 4, name: "$$$$" },
            ]}
            onOptionChange={this.handleOptionChange}
            selected={this.props.filters.price}
            name="price"
            icon="dollar-sign"
          />
        </div>
        <div className="navbar-item">
          <OptionsFilter
            options={[
              { value: "", name: "Cualquier tamaño" },
              { value: 10, name: "Hotel pequeño" },
              { value: 20, name: "Hotel mediano" },
              { value: 30, name: "Hotel grande" },
            ]}
            onOptionChange={this.handleOptionChange}
            selected={this.props.filters.rooms}
            name="rooms"
            icon="bed"
          />
        </div>
      </nav>
    );
  }
}

class Hotel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={this.props.data.photo} alt={this.props.data.name} />
          </figure>
        </div>
        <div className="card-content">
          <p className="title is-4">{this.props.data.name}</p>
          <p>{this.props.data.description}</p>
          <div className="field is-grouped is-grouped-multiline" style={{ marginTop: "1em" }}>
            <div className="control">
              <div className="tags has-addons">
                <span className="tag is-medium is-info">
                  <i className="fas fa-map-marker"></i>
                </span>
                <span className="tag is-medium">
                  {this.props.data.city}, {this.props.data.country}
                </span>
              </div>
            </div>
            <div className="control">
              <div className="tags has-addons">
                <span className="tag is-medium is-info">
                  <i className="fas fa-bed"></i>
                </span>
                <span className="tag is-medium">{this.props.data.rooms} Habitaciones</span>
              </div>
            </div>
            <div className="control">
              <div className="tags">
                <span className="tag is-medium is-info">
                  <i className="fas fa-dollar-sign" style={{ margin: "0 .125em" }}></i>
                  <i className="fas fa-dollar-sign" style={{ margin: "0 .125em" }}></i>
                  <i className="fas fa-dollar-sign" style={{ margin: "0 .125em", opacity: ".25" }}></i>
                  <i className="fas fa-dollar-sign" style={{ margin: "0 .125em", opacity: ".25" }}></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <a
            href="javascript:alert('No implementamos esto aún :(')"
            className="card-footer-item has-background-primary has-text-white has-text-weight-bold"
          >
            Reservar
          </a>
        </div>
      </div>
    );
  }
}

class Hotels extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.hotel);
    return (
      <section className="section" style={{ marginTop: "3em" }}>
        <div className="container">
          <div className="columns is-multiline">
            {this.props.hotel.length > 0 ? (
              this.props.hotel.map((data) => (
                <div className="column is-one-third">
                  <Hotel data={data} />
                </div>
              ))
            ) : (
              <article className="message is-warning">
                <div className="message-body">
                  No se han encontrado hoteles que coincidan con los parámetros de búsqueda.
                </div>
              </article>
            )}
          </div>
        </div>
      </section>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        dateFrom: today.toLocaleDateString(), // Proviene del archivo data.js
        dateTo: new Date(today.valueOf() + 86400000).toLocaleDateString(),
        country: undefined,
        price: undefined,
        rooms: undefined,
      },
      hotels: hotelsData,
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(payload) {
    this.setState((state) => ({
      filters: payload,
      hotels:
        !payload.country && !payload.price && !payload.rooms
          ? hotelsData
          : hotelsData.filter(
              (hotel) =>
                hotel.country === payload.country ||
                hotel.price === parseInt(payload.price) ||
                hotel.rooms === parseInt(payload.rooms)
            ),
      property1: payload[payload],
    }));
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Hero filters={this.state.filters}></Hero>
        <Filters filters={this.state.filters} onFilterChange={this.handleFilterChange} />
        <Hotels hotel={this.state.hotels} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
