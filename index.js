const $myInfo = document.querySelector('#my_info');
function getName(name) {
    let $input = document.querySelector("input").value;
    name = $input == '' ? "yan" : $input
    link = `https://api.nationalize.io/?name=${name}`;
    fetch(link)
        .then(r => r.json())
        .then(displayInfo)
}

getName()
function displayInfo(data) {
    $myInfo.innerHTML = `<h1>${data['name'].toUpperCase()}</h1>`
    data['country'].forEach((element) => {
        let probability = ((element['probability']) * 100).toFixed(2)
        let country_name = element['country_id']
        // console.log(country_name)
        let url = `https://api.worldbank.org/v2/country/${country_name}?format=json`;
        fetch(url)
            .then(r => r.json())
            .then(getCountry)
        function getCountry(dataC) {
            let countryN = dataC[1][0].name
            // console.log(countryN)
            $myInfo.innerHTML += `
            <h3>${countryN}</h3>
            <h4>${probability}%</h4>
            `
        }

    });
}


