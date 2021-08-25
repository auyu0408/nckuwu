var table = document.querySelector('table');
var requestURL = "index.html.json";
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
    var Data = request.response;
    showDatas(Data);
}
function showDatas(Datajson){
    for (i=0; i<Datajson.length; i++){
        var Outside = document.createElement('tr');
        var Td1 = document.createElement('td');
        var Td2 = document.createElement('td');
        Td1.textContent = Datajson[i].Name;
        Td2.textContent = Datajson[i].Department;
        Outside.appendChild(Td1);
        Outside.appendChild(Td2);

        table.appendChild(Outside)
    }
}