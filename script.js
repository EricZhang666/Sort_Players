const allPlayers = [...data];
const positionList = listPosition(allPlayers);
const countryList = listCountry(allPlayers);
let reversed = false;
const months = ['January', 'February', 'March', 'April', 'May', 'June', 
'July', 'August', 'September', 'October', 'November', 'December'];

const sortOptions = [
    {name:"First Name", value:"firstName"},
    {name:"Last Name", value:"lastName"},
    {name:"Number", value:"number"},
    {name:"Date of Birth", value:"dateOfBirth"},
    {name:"Years in League", value:"yearsInLeague"}
];

//load initial table with all players 
function loadTable() {
    generateTable(sortPlayers(allPlayers));
    generateCountryFilter();
    generatePositionFilter();
    generateSorter();
}

//generate table for a particular array of players
function generateTable(arr) {
    document.getElementsByTagName("h4")[0].innerHTML = "Results Found: " + arr.length;
    let tableBody = "";
    for(var i = 0; i < arr.length; i ++){
        tableBody += generateRow(arr[i]);
    }
    $("#tbody").html(tableBody);
}

//generate one row for one single player data
function generateRow(player) {
    let age = new Date().getUTCFullYear() - new Date(player.DOB).getUTCFullYear();
    let row = `<tr><td>${player.Number}</td><td>${player.First_Name}</td><td>${player.Last_Name}</td><td>${player.Position}</td><td>${player.DOB} (<b>${age}</b>)</td><td>${player.Country}</td><td>${player.Years_in_league}</td><td>${player.College}</td></tr>`;
    return row;
}

//generate a unique array of different positions 
function listPosition(data) {
    let allPositions = data.map(player => player.Position);
    let positionList = [...new Set(allPositions)];
    console.log(positionList);
    return positionList;
}

//generate a unique array of different countries
function listCountry(data) {
    let allCountries = data.map(player => player.Country);
    let countryList = [...new Set(allCountries)];
    console.log(countryList);
    return countryList;
}

//generate country filter for country list in dom 
function generateCountryFilter() {
    let options = "<option selected value='all'>All Countries</option>";
    for(var i = 0; i < countryList.length; i++){
        options += `<option value=${countryList[i]}>${countryList[i]}</option>`;
    }
    $("#countryFilter").html(options);
}

//generate position filter for position list in dom 
function generatePositionFilter() {
    let options = "<option selected value='all'>All Positions</option>";
    for(var i = 0; i < positionList.length; i++){
        options += `<option value=${positionList[i]}>${positionList[i]}</option>`;
    }
    $("#positionFilter").html(options);
}

function generateSorter() {
    let options = "";
    for(var i = 0; i < sortOptions.length; i++){
        options += `<option value=${sortOptions[i].value}>${sortOptions[i].name}</option>`;
    }
    $("#sort").html(options);
}

//update table after applying filter and sort
function updateTable() {
    let currentList = allPlayers.slice();
    let country = $("#countryFilter").val();
    let position = $("#positionFilter").val();
    let sort = $("#sort").val();
    
    currentList = filterByCountry(currentList, country);
    currentList = filterByPosition(currentList, position);
    console.log(sort);
    if(reversed){
        currentList = sortPlayersReversed(currentList, sort);
    }else{
        currentList = sortPlayers(currentList, sort);
    }
    generateTable(currentList);
}

//apply country filter
function filterByCountry(arr, country) {
    let currentList = arr.slice();
    if(country !== "all"){
        currentList = arr.filter(player => player.Country === country);
    }
    return currentList;
}

//apply position filter
function filterByPosition(arr, position) {
    let currentList = arr.slice();
    if(position !== "all"){
        currentList = arr.filter(player => player.Position === position);
    }
    return currentList;
}

//change order of sorting
function reverse() {
    reversed = !reversed;
}

//sort array of players (by first name by default)
function sortPlayers(arr, sort) {
    let num = [];
    let str = [];
    let currentList = arr.slice();
    switch (sort) {
        case "lastName":
            currentList.sort((a, b) => {
                if(a.Last_Name < b.Last_Name){
                    return -1;
                }else if(a.Last_Name > b.Last_Name){
                    return 1;
                }
                return 0;
            });
            break;

        case "number":
            num = [];
            str = [];
            currentList.map(player => isNaN(player.Number) ? str.push(player) : num.push(player));
            num.sort((a, b) => {
                return a.Number - b.Number;
            });
            str.sort((a, b) => {
                if(a.First_Name < b.First_Name){
                    return -1;
                }else if(a.First_Name > b.First_Name){
                    return 1;
                }
                return 0;
            });
            currentList = num.concat(str);
            break;
        
        case "yearsInLeague":
            num = [];
            str = [];
            currentList.map(player => isNaN(player.Years_in_league) ? str.push(player) : num.push(player));
            num.sort((a, b) => {
                return a.Years_in_league - b.Years_in_league;
            });
            str.sort((a, b) => {
                if(a.First_Name < b.First_Name){
                    return -1;
                }else if(a.First_Name > b.First_Name){
                    return 1;
                }
                return 0;
            });
            currentList = num.concat(str);
            break;
        
        case "dateOfBirth":
            currentList.sort((a, b) => {
                if(new Date(a.DOB) < new Date(b.DOB)){
                    return 1;
                }else if(new Date(a.DOB) > new Date(b.DOB)){
                    return -1
                }
                return 0;
            });
            break;
        
        default:
            currentList.sort((a, b) => {
                if(a.First_Name < b.First_Name){
                    return -1;
                }else if(a.First_Name > b.First_Name){
                    return 1;
                }
                return 0;
            });
            break;
    }

    return currentList;
}

//sort array of players (by first name by default)
function sortPlayersReversed(arr, sort) {
    let num = [];
    let str = [];
    let currentList = arr.slice();
    switch (sort) {
        case "lastName":
            currentList.sort((a, b) => {
                if(a.Last_Name > b.Last_Name){
                    return -1;
                }else if(a.Last_Name < b.Last_Name){
                    return 1;
                }
                return 0;
            });
            break;

        case "number":
            num = [];
            str = [];
            currentList.map(player => isNaN(player.Number) ? str.push(player) : num.push(player));
            num.sort((a, b) => {
                return b.Number - a.Number;
            });
            str.sort((a, b) => {
                if(a.First_Name > b.First_Name){
                    return -1;
                }else if(a.First_Name < b.First_Name){
                    return 1;
                }
                return 0;
            });
            currentList = num.concat(str);
            break;
        
        case "yearsInLeague":
            num = [];
            str = [];
            currentList.map(player => isNaN(player.Years_in_league) ? str.push(player) : num.push(player));
            num.sort((a, b) => {
                return b.Years_in_league - a.Years_in_league;
            });
            str.sort((a, b) => {
                if(a.First_Name > b.First_Name){
                    return -1;
                }else if(a.First_Name < b.First_Name){
                    return 1;
                }
                return 0;
            });
            currentList = num.concat(str);
            break;
        
        case "dateOfBirth":
            currentList.sort((a, b) => {
                if(new Date(a.DOB) > new Date(b.DOB)){
                    return 1;
                }else if(new Date(a.DOB) < new Date(b.DOB)){
                    return -1
                }
                return 0;
            });
            break;
        
        default:
            currentList.sort((a, b) => {
                if(a.First_Name > b.First_Name){
                    return -1;
                }else if(a.First_Name < b.First_Name){
                    return 1;
                }
                return 0;
            });
            break;
    }

    return currentList;
}

