var file_raw = "https://raw.githubusercontent.com/Darkborderman/schoolWorks/develop/api/static/"

var ul = document.querySelector('ul');
var li = document.getElementById('list');
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
        key[1] = decodeURIComponent(key[1]);
        Data = filterText(key[1], Data);
    }
    showDatas(Data, ul);
}
oinput.oninput=function(){
    var Origin = request.response;
    text = this.value;
    if (text == ''){
        list.innerHTML = '';
    }else{
        var newData = filterText(text, Origin);
        showDatas(newData, li);
    }
}
function showDatas(Datajson, obj){
    obj.innerHTML = '';
    Datajson = Datajson.sort(function(a,b){
        return a.course_id > b.course_id;
    });
    var temp = "";
    for (i=0; i<Datajson.length; i++){
        if (temp.course_id === Datajson[i].course_id){
            continue;
        }
        var Link = document.createElement('a');
        var Name = document.createElement('div');
        var Department = document.createElement('span');
        Link.href = "course.html?co_no=" +Datajson[i].course_id;
        Link.className = "list-group-item d-flex list-group-item-action";
        Name.textContent = Datajson[i].course_id;
        Name.className = "me-auto";
        Name.style = "color: #733830;"
        str = Datajson[i].department;
        Department.textContent = str ? str.substr(0,3) : str;
        Department.className = "badge badge-outline-primary rounded-pill";
        Link.appendChild(Name);
        Link.appendChild(Department);
        obj.appendChild(Link);
        temp = Datajson[i];
    }
}
function filterText(key, OriginData){
    return OriginData.filter(function(elem, index){
        if (elem.course_id.indexOf(key)!=-1){
            return true;
        }
        //else if(elem.department.indexOf(key)!=-1){
        //    return true;
        //}
//        else if(elem.instructor.indexOf(key)!=-1){
        //    return true;
       // }
        else{
            return false;
        }
    })
}