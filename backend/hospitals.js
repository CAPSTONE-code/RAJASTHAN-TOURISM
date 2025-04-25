
let cityArray=[]
fetch('http://localhost:3000/api/hospitals').then(res => res.json()).then(data =>{
    const container = document.getElementById('hospital-list');
    for (const city in data) {
        const cityDiv = document.createElement('table');
        cityDiv.className = 'city';
        let cityname=Object.keys(data[city]).toString()
        cityArray.push(cityname)
        cityDiv.id=cityname;    
        const cityTitle = document.createElement('h2');
        cityTitle.innerText = cityname;
        cityDiv.appendChild(cityTitle);
        let header=document.createElement('tr')
        header.innerHTML=`<th>Hospital</th><th>Address</th><th>Contact</th>`
        cityDiv.appendChild(header)

        data[city][cityname].forEach(hospital => {
            const hospitalDiv = document.createElement('tr');
            hospitalDiv.className = 'hospital';
            if (hospital["Hospital Name"]) {
                const name = document.createElement('td');
                name.className='name';
                name.innerText = hospital["Hospital Name"];
                hospitalDiv.appendChild(name);
            }

            if (hospital.Address) {
                const address = document.createElement('td');
                address.className='address';
                address.innerText = `Address: ${hospital.Address}`;
                hospitalDiv.appendChild(address);
            }

            if (hospital["Phone Number"]) {
                const phone = document.createElement('td');
                phone.className='contact';
                phone.innerText = `${hospital["Phone Number"]}`;
                hospitalDiv.appendChild(phone);
            }
            cityDiv.appendChild(hospitalDiv);
    });

        container.appendChild(cityDiv);
    }
}
)

let filterList=document.getElementById("myDropdown")
let citylink=``
for(city of cityArray){
    citylink=citylink+`<a href="#${city}">${city} -></a>`
}
filterList.innerHTML=citylink;


function dropmenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    let filterList=document.getElementById("myDropdown")
let citylink=``
for(city of cityArray){
    citylink=citylink+`<a href="#${city}">${city} -></a>`
}
filterList.innerHTML=citylink;


function dropmenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
