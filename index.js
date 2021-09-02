var file_raw = "https://raw.githubusercontent.com/Darkborderman/schoolWorks/develop/api/static/"

var ul = document.querySelector('ul');
var list = document.getElementById('list');
var oinput = document.getElementById('q');
var url = location.search;
var requestURL = file_raw + "index.json";
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
    var Data = request.response;
    if (url === ""){
    }else{
        var key = url.split("=");
        if (key[0] === "?q"){
            key[1] = decodeURIComponent(key[1]);
            Data = filterText(key[1].toUpperCase(), Data);
        }
    }
    Data = Data.sort(function(a,b){
        if (a.course_id === b.course_id){
            return a.year > b.year
        }
        return a.course_id > b.course_id;
    });
    showDatas(Data);
}
oinput.oninput=function(){
    var Origin = request.response;
    text = this.value;
    if (text == ''){
        list.innerHTML = '';
    }else{
        var newData = filterText(text.toUpperCase(), Origin);
        showBars(newData);
    }
}
function showDatas(Datajson){
    var temp = "";
    var select = document.createElement('div');
    select.style = "height: 500px; width:100%; overflow:hidden; overflow-y:scroll;"
    select.className = "form-select list-group list-group-flush";
    for (i=0; i<Datajson.length; i++){
        if (temp.course_id === Datajson[i].course_id){
            continue;
        }
        var Link = document.createElement('a');
        var Name = document.createElement('div');
        var Co_no = document.createElement('div');
        var Department = document.createElement('span');
        Link.href = "course.html?co_no=" +Datajson[i].course_id;
        Link.className = "list-group-item list-group-item-action";
        Name.textContent = Datajson[i].course_name;
        Name.className = "me-auto";
        Name.style = "color: #733830;"
        Co_no.innerHTML = Datajson[i].course_id + '&nbsp';
        str = Datajson[i].department; 
        Department.textContent = str ? str.substr(0,3) : str;
        Department.className = "badge badge-outline-primary rounded-pill";
        Co_no.appendChild(Department);
        Link.appendChild(Co_no);
        Link.appendChild(Name);
        select.appendChild(Link);
        temp = Datajson[i];
    }
    ul.appendChild(select);
}

function showBars(Datajson){
    list.innerHTML = '';
    Datajson = Datajson.sort(function(a,b){
        return a.course_id > b.course_id;
    });
    var temp = "";
    var select = document.createElement('div');
    select.className = "list-group";
    for (i=0; i<Datajson.length; i++){
        if (temp.course_id === Datajson[i].course_id){
            continue;
        }
        var Link = document.createElement('a');
        var Name = document.createElement('div');
        var Department = document.createElement('span');
        Link.href = "course.html?co_no=" +Datajson[i].course_id;
        Link.className = "list-group-item d-flex list-group-item-action";
        Name.innerHTML = '&nbsp' + Datajson[i].course_name.split(" ")[0];
        Name.className = "me-auto";
        Name.style = "color: #733830;"
        Department.innerHTML = Datajson[i].department.substr(0,3);
        Department.className = "badge rounded-pill badge-outline-primary";
        Link.appendChild(Department);
        Link.appendChild(Name);
        select.appendChild(Link);
        temp = Datajson[i];
    }
    list.appendChild(select);
}

function filterText(key, OriginData){
    return OriginData.filter(function(elem, index){
        if (elem.course_id.indexOf(key)!=-1){
            return true;
        }
        if (elem.course_name){
            if (elem.course_name.indexOf(key)!=-1){
                return true
            }
        }
        if (elem.department){
            if(elem.department.indexOf(key)!=-1){
                return true
            }
        }
        if (elem.instructor){
            if(elem.instructor.indexOf(key)!=-1){
                return true
            }
        }
        else{
            return false;
        }
    })
}