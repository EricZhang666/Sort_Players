const positionList = listPosition(data);
const countryList = listCountry(data);

//load initial table with all players 
function loadTable() {
    generateTable(data);
    generateCountryFilter();
    generatePositionFilter();
}

//generate table for a particular array of players
function generateTable(arr) {
    document.getElementsByTagName("h4")[0].innerHTML = "Results Found: " + arr.length;
    let tableBody = "";
    for(var i = 0; i < arr.length; i ++){
        tableBody += generateRow(data[i]);
    }
    document.getElementById("tbody").innerHTML = tableBody;
}

//generate one row for one single player data
function generateRow(player) {
    let row = `<tr><td>${player.Number}</td><td>${player.First_Name}</td><td>${player.Last_Name}</td><td>${player.Position}</td><td>${player.DOB}</td><td>${player.Country}</td><td>${player.Years_in_league}</td><td>${player.College}</td></tr>`;
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

function generateCountryFilter() {
    let options = "<option selected>All Countries</option>";
    for(var i = 0; i < countryList.length; i++){
        options += `<option value=${countryList[i]}>${countryList[i]}</option>`;
    }
    document.getElementById("countryFilter").innerHTML = options;
}

function generatePositionFilter() {
    let options = "<option selected>All Positions</option>";
    for(var i = 0; i < positionList.length; i++){
        options += `<option value=${positionList[i]}>${positionList[i]}</option>`;
    }
    document.getElementById("positionFilter").innerHTML = options;
}