var file_raw = "https://raw.githubusercontent.com/auyu0408/fire_bone/master/file_simulate/"

var oinput = document.getElementById('q');
var list = document.getElementById('list');
var URL = file_raw + "index_example.json";
var search_request = new XMLHttpRequest();
search_request.open('GET', URL);
search_request.responseType = 'json';
search_request.send();
oinput.oninput=function(){
    var Origin = search_request.response;
    text = this.value;
    if (text == ''){
        list.innerHTML = '';
    }else{
        var newData = filterText(text, Origin);
        showDatas(newData);
    }
}

function showDatas(Datajson){
    list.innerHTML = '';
    for (i=0; i<Datajson.length; i++){
        var Link = document.createElement('a');
        var Name = document.createElement('div');
        var Department = document.createElement('span');
        Link.href = "course.html?co_no=" +Datajson[i].Co_no;
        Link.className = "list-group-item d-flex list-group-item-action";
        Name.textContent = Datajson[i].Name;
        Name.className = "me-auto";
        Department.textContent = Datajson[i].Department;
        Department.className = "badge badge-outline-primary rounded-pill";
        Link.appendChild(Name);
        Link.appendChild(Department);
        list.appendChild(Link);
    }
}

function filterText(key, OriginData){
    return OriginData.filter(function(elem, index){
        if (elem.Co_no.indexOf(key)!=-1){
            return true;
        }
        else if(elem.Department.indexOf(key)!=-1){
            return true;
        }
        else if(elem.Name.indexOf(key)!=-1){
            return true;
        }
        else{
            return false;
        }
    })
}
