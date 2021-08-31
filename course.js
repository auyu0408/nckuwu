var file_raw = "https://raw.githubusercontent.com/Darkborderman/schoolWorks/develop/api/static/"

//bar search
var oinput = document.getElementById('q');
var list = document.getElementById('list');
var searchURL = file_raw + "index.json";
var search_request = new XMLHttpRequest();
search_request.open('GET', searchURL);
search_request.responseType = 'json';
search_request.send();
oinput.oninput=function(){
    var indexD = search_request.response;
    text = this.value;
    if (text == ''){
        list.innerHTML = '';
    }else{
        var newData = filterText(text, indexD);
        showBars(newData);
    }
}

var card = document.getElementById('card');
var title = document.getElementById('Co_no');
var url = location.search;
var temp;
try{
    temp = url.split("=");
    if (temp[0] != "?co_no"){
        throw "Wrong url.";
    }
}
catch(e){
    Error_message(e);
}
search_request.onload = function(){
    try{
        var indexD = search_request.response;
        infoD = filterText(temp[1], indexD);
        if (infoD === ""){
            throw "File not found.";
        }
        infoD = infoD.sort(function(a,b){
            return b.year - a.year;
        });
        ShowCourse(infoD);
        showDetail(infoD);
    }
    catch(e){
        Error_message(e);
    }
}
function ShowCourse(Datajson){
    var Course = document.createElement('h3');
    var Eng = document.createElement('h5');
    Course.innerHTML = ' &nbsp;&nbsp;'+ Datajson[0].course_name.split(" ")[0];
    Course.className = "fw-bold";
    Course.style = "color: #c1535c;";
    Eng.innerHTML = ' &nbsp;&nbsp;'+ Datajson[0].course_name.replace(Datajson[0].course_name.split(" ")[0],"");
    Eng.style = "color: #c1535c;";
    title.appendChild(Course);
    title.appendChild(Eng);
}
function showDetail(infoD){
    for (i=0; i<infoD.length; i++){
        var Col = document.createElement('div');
        var Card = document.createElement('div');
        var Body = document.createElement('div');
        var Title = document.createElement('h5');
        var Teacher = document.createElement('p');
        var smol_class = document.createElement('a');
        Col.className = "col-6";
        Card.className = "card m-1";
        Body.className = "card-body";
        Title.className = "card-title";
        Title.innerHTML = "開課學年: " + infoD[i].year + "-" + infoD[i].semester;
        Title.style = "color: #733830;";
        Teacher.innerHTML = "課程碼: " + infoD[0].course_id + '<br>' + "開課系所: " + infoD[0].department.substr(0,3) + '<br>' + "授課教師: " + infoD[i].instructor;
        Teacher.style = "color: #733830;";
        smol_class.href = "detail.html?co_no=" + infoD[i].course_id + "&year_sem=" + infoD[i].year + "_" + infoD[i].semester + "/" + infoD[i].class_code;
        smol_class.innerHTML = "分班碼: " + infoD[i].class_code + ' &nbsp;';
        smol_class.style = "text-decoration:none; color: #43afb1;"
        Body.appendChild(Title);
        Body.appendChild(Teacher);
        Body.appendChild(smol_class);
        Card.appendChild(Body);
        Col.appendChild(Card);   
        card.appendChild(Col)
    }
}

function showBars(Datajson){
    list.innerHTML = '';
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
        Name.textContent = Datajson[i].course_name.split(" ")[0];
        Name.className = "me-auto";
        Name.style = "color: #733830;"
        Department.textContent = Datajson[i].department.substr(0,3) ;
        Department.className = "badge badge-outline-primary rounded-pill";
        Link.appendChild(Name);
        Link.appendChild(Department);
        list.appendChild(Link);
        temp = Datajson[i];
    }
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

function Error_message(msg){
    var message = document.createElement('h4');
    message.className = "text-center";
    message.style= "color: #733830;";
    message.innerHTML = msg;
    card.appendChild(message);
}