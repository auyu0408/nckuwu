var file_raw = "https://raw.githubusercontent.com/auyu0408/fire_bone/master/file_simulate/"

//bar search
var oinput = document.getElementById('q');
var list = document.getElementById('list');
var searchURL = "file_simulate/index_example.json";
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
        ShowCourse(infoD);
        showDetail(infoD);
    }
    catch(e){
        Error_message(e);
    }
}
function ShowCourse(Datajson){
    var Course = document.createElement('h3');
    Course.innerHTML = ' &nbsp;&nbsp;'+ Datajson[0].Co_no;
    Course.className = "fw-bold";
    Course.style = "color: #c1535c;";
    title.appendChild(Course);
}
function showDetail(infoD){
    var Detail = infoD[0].Detail;
    for (i=0; i<Detail.length; i++){
        var Col = document.createElement('div');
        var Card = document.createElement('div');
        var Body = document.createElement('div');
        var Title = document.createElement('h5');
        var Teacher = document.createElement('p');
        var Class = document.createElement('p');
        Col.className = "col";
        Card.className = "card";
        Body.className = "card-body";
        Title.className = "card-title";
        Title.innerHTML = "開課學年: " + Detail[i].Year_sem;
        Title.style = "color: #733830;";
        Teacher.innerHTML = "課程名稱: " + infoD[0].Name + '<br>' + "授課教師: " + Detail[i].Teacher;
        Teacher.style = "color: #733830;";
        var Class_code = Detail[i].Class_code;
        for (j=0; j<Class_code.length; j++){
            var smol_class = document.createElement('a');
            smol_class.href = "detail.html?co_no=" + infoD[0].Co_no + "&year_sem=" + Detail[i].Year_sem + "/" + Class_code[j];
            smol_class.innerHTML = "分班: " + Class_code[j] + ' &nbsp;';
            smol_class.style = "text-decoration:none; color: #43afb1;"
            Class.appendChild(smol_class);
        }
        Body.appendChild(Title);
        Body.appendChild(Teacher);
        Body.appendChild(Class);
        Card.appendChild(Body);
        Col.appendChild(Card);   
        card.appendChild(Col)
    }
}

function showBars(Datajson){
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

function Error_message(msg){
    var message = document.createElement('h4');
    message.className = "text-center";
    message.style= "color: #733830;";
    message.innerHTML = msg;
    card.appendChild(message);
}