class Hero extends React.Component {
  constructor(props) {
    super(props);
    debugger;
  }
  render() {
    return (
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Hoteles</h1>
            <h2 className="subtitle">
              desde el <strong>{new Date(this.props.filters.dateFrom).toLocaleDateString()}</strong> hasta el{" "}
              <strong>{new Date(this.props.filters.dateTo).toLocaleDateString()}</strong>
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

class DateFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(event) {
    debugger;
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
            value={this.props.date}
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
              {this.props.options.map(option => (
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
              { value: undefined, name: "Todos los países" },
              { value: "Argentina", name: "Argentina" },
              { value: "Brasil", name: "Brasil" },
              { value: "Chile", name: "Chile" },
              { value: "Uruguay", name: "Uruguay" }
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
              { value: undefined, name: "Cualquier precio" },
              { value: 1, name: "$100" },
              { value: 2, name: "$250" },
              { value: 3, name: "$3500" },
              { value: 4, name: "$65000" }
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
              { value: undefined, name: "Cualquier tamaño" },
              { value: 10, name: "Hotel pequeño" },
              { value: 20, name: "Hotel mediano" },
              { value: 30, name: "Hotel grande" }
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        dateFrom: today, // Proviene del archivo data.js
        dateTo: new Date(today.valueOf() + 86400000),
        country: "",
        price: 0,
        rooms: 0
      }
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(payload) {
    debugger;
    this.setState({
      filters: payload
    });
  }

  render() {
    return (
      <div>
        <Hero filters={this.state.filters}></Hero>
        <Filters filters={this.state.filters} onFilterChange={this.handleFilterChange} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
