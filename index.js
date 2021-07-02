let data = [];
let filterInput = document.querySelector("#filterByLetter");

let filterByAge = document.querySelector("#filterByAge");
let filterByAgeLabel = document.querySelector("#filterByAgeLabel");

let filterByActive = document.querySelector("#filterByActive");
let filterByActiveLabel = document.querySelector("#filterByActiveLabel");

const fetchData = () => {
    //verinin çekildiği yer
    fetch("data.json")
    .then(response => {
        return response.json();
    })
    .then(responseData => {
        //json'dan okunan verinin data array'ine atanması
        data = responseData;

        //veri geldikten sonra filtreleme butonu görünür olsun
        let filterButton = document.querySelector("#filterButton");
        
        filterButton.setAttribute("style", "");
        filterInput.setAttribute("style", "");
        filterByAge.setAttribute("style", "");
        filterByAgeLabel.setAttribute("style", "");
        filterByActive.setAttribute("style", "");
        filterByActiveLabel.setAttribute("style", "");

        //verinin html içerisinde listelendiği fonksiyon
        listData(responseData);
    })
    .catch(err => {
        //hata yönetimi
        console.log(err)
        alert("Bir hata oluştu!")
    })

}

//verinin ul tag'i içerisinde listelenmesini sağlayan fonksiyon
const listData = (data) => {
    let list = document.querySelector(".list");
    list.innerHTML = data.map(element => {
        return `
        <li id=${element.id}>
            <span class='bold'>name:</span> ${element.name}
            <span class='bold'>email:</span> ${element.email}
            <span class='bold'>age:</span> ${element.age}
            <span class='bold'>isActive:</span> ${element.isActive}
        </li>
        `;
    })
}

//verinin filtrelenmesini sağlayan fonksiyon
const filterData = (filter) => {
    let filteredData = data;
    if(filterByActive.checked) {
        filteredData = filteredData.filter(element => element.isActive === true)
    }
    if(filterByAge.checked) {
        filteredData = filteredData.filter(element => element.age >= 18)
    }
    if(filterInput.value) {
        filteredData = filteredData.filter(element => element.name.charAt(0) == filterInput.value.toUpperCase())
    }
    listData(filteredData);
}