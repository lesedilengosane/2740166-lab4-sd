async function getData() {
    let country_name = document.getElementById("country-name").value;  

    const url = "https://restcountries.com/v3.1/name/" + country_name + "?fullText=true";  

    try {
        const response = await fetch(url);  
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`); 
        }

        const json_data = await response.json();  
       
        const country = json_data[0];

    
        const capital = country.capital ? country.capital[0] : "N/A";  
        document.getElementById("capital").innerText = `Capital: ${capital}`;

     
        const population = country.population ? country.population : "N/A"; 
        document.getElementById('population').innerText = `Population: ${population.toLocaleString()}`;  

        const region = country.region ? country.region : "N/A";  
        document.getElementById('region').innerText = `Region: ${region}`;

        const flag = country.flags ? country.flags.png : "";  
        document.getElementById('flag').src = flag;

        const borderingCountries = country.borders || [];  
        const borderingList = document.getElementById("bordering-list");
        borderingList.innerHTML = "";  

     
        for (let countryCode of borderingCountries) {
            const borderCountryItem = document.createElement("li");

            const borderCountryUrl = `https://restcountries.com/v3.1/alpha/${countryCode}`;
            try {
                const borderResponse = await fetch(borderCountryUrl);
                if (!borderResponse.ok) {
                    throw new Error(`Failed to fetch border country data for ${countryCode}`);
                }
                const borderCountryData = await borderResponse.json();
                const borderCountry = borderCountryData[0]; 

                const flagImg = document.createElement("img");
                flagImg.src = borderCountry.flags.png; 
                flagImg.alt = borderCountry.name.common;  
                flagImg.width = 30;  

                const countryName = document.createElement("span");
                countryName.innerText = borderCountry.name.common;  

             
                borderCountryItem.appendChild(flagImg);
                borderCountryItem.appendChild(countryName);

                borderingList.appendChild(borderCountryItem);
            } catch (error) {
                console.error(`Error fetching border country ${countryCode}: ${error.message}`);
            }
        }

    } catch (error) {
        console.error(error.message);  
    }
}

document.getElementById("fetch-button").addEventListener("click", getData);
