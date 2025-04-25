

// Function to load data into the HTML page
function loadCitiesData(data) {
  const citiesContainer = document.querySelector('.cities'); // Select the container element
  citiesContainer.innerHTML = ''; // Clear any existing content

  // Group data by city
  const groupedData = data.reduce((acc, item) => {
      acc[item.City] = acc[item.City] || [];
      acc[item.City].push(item);
      return acc;
  }, {});

  // Create HTML structure for each city
  Object.entries(groupedData).forEach(([city, guides]) => {
      const cityDiv = document.createElement('div');
      cityDiv.className = 'city-box';

      const cityHeading = document.createElement('h2');
      cityHeading.className = 'city-heading';
      cityHeading.textContent = city.toUpperCase().split('').join(' ');

      const hr=document.createElement('hr');
      cityDiv.appendChild(cityHeading);
      cityDiv.appendChild(hr);  
      let counter=1;  
      guides.forEach(guide => {
          const guideDiv = document.createElement('div');
          guideDiv.className = 'guide-box';

          const guideName = document.createElement('h3');
          guideName.innerText = `${counter}.${guide['Tour-guide/travel-agency']}`;
          counter=counter+1  

          const contactInfo = document.createElement('ul');
          contactInfo.innerHTML = `<div>◦ Contact: ${guide.contact}</div><div>◦ Languages spoken: ${guide['languages-spoken']}</div>`;
          contactInfo.className='details';  

          guideDiv.appendChild(guideName);
          guideDiv.appendChild(contactInfo);

          cityDiv.appendChild(guideDiv);
      });

      citiesContainer.appendChild(cityDiv);
  });
}

// Example data (replace this with your actual fetched data)
async function loadGuides() {
      const response = await fetch(`http://localhost:3000/api/tourist-guides?city=all`);
      const guides = await response.json();
      loadCitiesData(guides);
}

loadGuides()