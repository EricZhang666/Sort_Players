
function loadAllPlayers(arr) {
    document.getElementsByTagName("h4")[0].innerHTML = "Results Found: " + arr.length;
    let tableBody = "";
    for(var i = 0; i < arr.length; i ++){
        tableBody += generateRow(data[i]);
    }
    document.getElementById("tbody").innerHTML = tableBody;
}


function generateRow(player) {
    let row = `<tr><td>${player.Number}</td><td>${player.First_Name}</td><td>${player.Last_Name}</td><td>${player.Position}</td><td>${player.DOB}</td><td>${player.Country}</td><td>${player.Years_in_league}</td><td>${player.College}</td></tr>`;
    return row;
}