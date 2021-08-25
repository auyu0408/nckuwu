var ul = document.querySelector('ul');
var requestURL = "index_example.json";
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
        var Link = document.createElement('a');
        var Name = document.createElement('div');
        var Department = document.createElement('span');
        Link.href = "#";
        Link.className = "list-group-item d-flex list-group-item-action";
        Name.textContent = Datajson[i].Name;
        Name.className = "me-auto";
        Department.textContent = Datajson[i].Department;
        Department.className = "badge bg-info rounded-pill";
        Link.appendChild(Name);
        Link.appendChild(Department);

        ul.appendChild(Link);
    }
}