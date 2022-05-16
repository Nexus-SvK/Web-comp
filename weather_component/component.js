class HomeWork extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get loc() {
    return this.getAttribute("loc");
  }

  static get observedAttributes() {
    return ["loc"];
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    if (prop === "loc") {
      this.render();
    }
  }

  async geocode() {
    let location;
    let geodata;
    let data = [];
    try {
      location = await fetch(
        `http://api.positionstack.com/v1/forward?access_key=73e8a30967d0ca4900ba5c165a2479c5&query=${this.loc}`
      );
      geodata = await location.json();
      if (location.status != 200) {
        throw new Error("Location doesn't exist!");
      }
    } catch (error) {
      alert(error.message);
    }
    data.push(geodata);
    data.push(location.status);
    return data;
  }

  async temperature(lat, long) {
    let temp = fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a7b92f2c07cd7822ca92d32de27d8905&units=metric`
    );
    let dat = await temp;
    let result = await dat.json();
    return result;
  }

  coordinates = {
    lat: "0",
    long: "0",
  };

  geotemp = {
    country: "",
    region: "",
    temp: "",
  };

  render() {
    if (this.loc != 0) {
      this.shadowRoot.innerHTML = `
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-1">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
          </div>
        <div>
    <div>
    `;
    }
    this.weather();
    console.log(this.loc);
  }

  async weather() {
    if (this.loc != 0) {
      let geodat = await this.geocode();
      if (geodat[1] == 200) {
        this.coordinates.lat = geodat[0].data[0].latitude;
        this.coordinates.long = geodat[0].data[0].longitude;
        let result = await this.temperature(
          this.coordinates.lat,
          this.coordinates.long
        );
        this.geotemp.country = geodat[0].data[0].country;
        this.geotemp.region = geodat[0].data[0].region;
        this.geotemp.temp = result.main.temp;
        this.shadowRoot.innerHTML = `
    <link
      href="bootstrap-5.1.3-dist/css/bootstrap.min.css" rel="stylesheet"/>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-4">
            <div class="card shadow-sm">
                <img class="bd-placeholder-img card-img-top" style="width: auto;height: 250px" src="https://countryflagsapi.com/png/${this.geotemp.country}">
                <div class="card-body">
                    <div class="card-text">
                    <h1>${this.geotemp.country}</h1>
                    <h3>${this.geotemp.region}</h3>
                    <h3>${this.geotemp.temp}&deg;C</h3>
                    </div>
                </div>
            </div>
        </div>
        <div>
    <div>
    `;
      }
    }
  }
}
customElements.define("home-work", HomeWork);
