// Fetching data from the API
fetch('https://isro.vercel.app/api/centres')
  .then(response => response.json())
  .then(data => {
    // Creating a variable to store the centre data
    let centres = data.centres;

    // Getting DOM elements
    const searchInput = document.querySelector('#search');
    const searchBtn = document.querySelector('#search-btn');
    const cityBtn = document.querySelector('#city-btn');
    const stateBtn = document.querySelector('#state-btn');
    const centreBtn = document.querySelector('#centre-btn');
    const centreList = document.querySelector('#centre-list');

    // Function to display all the centres
    function displayAllCentres() {
      centreList.innerHTML = "";
      centres.sort((a, b) => a.name.localeCompare(b.name));
      centres.forEach(centre => {
        let centreEl = document.createElement('li');
        centreEl.classList.add('centre');
        centreEl.innerHTML = `
          <h3>${centre.name}</h3>
          <p>${centre.city}, ${centre.state}</p>
        `;
        centreList.appendChild(centreEl);
      });
    }

    // Display all the centres by default
    displayAllCentres();

    // Function to display centres based on search keyword and selected category
    function searchCentres() {
      let keyword = searchInput.value.toLowerCase();
      let category = "";

      if (cityBtn.classList.contains('active')) {
        category = "city";
      } else if (stateBtn.classList.contains('active')) {
        category = "state";
      } else if (centreBtn.classList.contains('active')) {
        category = "centre";
      }

      let filteredCentres = centres.filter(centre => {
        if (category === "city") {
          return centre.city.toLowerCase().includes(keyword);
        } else if (category === "state") {
          return centre.state.toLowerCase().includes(keyword);
        } else if (category === "centre") {
          return centre.name.toLowerCase().includes(keyword);
        } else {
          return true;
        }
      });

      centreList.innerHTML = "";
      filteredCentres.sort((a, b) => a.name.localeCompare(b.name));
      filteredCentres.forEach(centre => {
        let centreEl = document.createElement('li');
        centreEl.classList.add('centre');
        centreEl.innerHTML = `
          <h3>${centre.name}</h3>
          <p>${centre.city}, ${centre.state}</p>
        `;
        centreList.appendChild(centreEl);
      });
    }

    // Event listener for search button
    searchBtn.addEventListener('click', searchCentres);

    // Event listener for city button
    cityBtn.addEventListener('click', () => {
      cityBtn.classList.add('active');
      stateBtn.classList.remove('active');
      centreBtn.classList.remove('active');
      displayAllCentres();
    });

    // Event listener for state button
    stateBtn.addEventListener('click', () => {
      cityBtn.classList.remove('active');
      stateBtn.classList.add('active');
      centreBtn.classList.remove('active');
      displayAllCentres();
    });

    // Event listener for centre button
    centreBtn.addEventListener('click', () => {
      cityBtn.classList.remove('active');
      stateBtn.classList.remove('active');
      centreBtn.classList.add('active');
      displayAllCentres();
    });

    // Event listener for search input
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        searchCentres();
      }
    });
  })
  .catch(error => {
    console.log(error);
  });
