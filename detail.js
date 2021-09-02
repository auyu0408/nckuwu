var raw_remote = "https://raw.githubusercontent.com/Darkborderman/schoolWorks/develop/api/static/"
var remote = "https://download-directory.github.io/?url=https://github.com/Darkborderman/schoolWorks/tree/develop/api/static/"
var last_href = "course.html?co_no=";

//search bar
var oinput = document.getElementById('q');
var list = document.getElementById('list');
var searchURL = raw_remote + "index.json";
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
        var newData = filterText(text.toUpperCase(), indexD);
        showBars(newData);
    }
}

//detail card
var card = document.getElementById('card');
var last = document.getElementById('last');
var url = location.search;
var file_temp 
try{
    file_temp = Separate(url);
}
catch(e){
    Error_message(e);
}

var requestURL = raw_remote + file_temp.co_no + "/" + file_temp.year + "/" + file_temp.class_num + ".json";
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
    try{
        var indexD = search_request.response;
        var Data = request.response;
        if (request.status === 404){
            throw "File not found.";
        }
        var infoD = filterText(file_temp.co_no, indexD);
        infoD = infoD.sort(function(a,b){
            return b.year - a.year;
        });
        Lastlink(last_href+ infoD[0].course_id);
        showDetail(Data, infoD);
    }
    catch(e){
        Error_message(e);
        Lastlink("index.html");
    }
}

function showDetail(Datajson, infoData){
    var Body = document.createElement('div');
    var Co_name = document.createElement('h4');
    var Eng = document.createElement('h5');
    var Year_sem = document.createElement('h5');
    var Name = document.createElement('p');
    var File = document.createElement('div');
    var Download = document.createElement('a');
    Body.className = "card-body";
    Body.style = "max-height: 450px; width:100%; overflow:scroll; overflow-y:scroll;"
    Co_name.innerHTML = infoData[0].course_name.split(" ")[0];
    Co_name.style = "color: #733830;";
    Eng.innerHTML = infoData[0].course_name.replace(infoData[0].course_name.split(" ")[0],"");
    Eng.style = "color: #733830;";
    Year_sem.innerHTML = "開課學年: " + infoData[0].year + "-" + infoData[0].semester;
    Year_sem.style = "color: #733830;";
    Name.innerHTML = "課程碼: " + infoData[0].course_id + '<br>' + "分班碼:" +
    file_temp.class_num + '<br>'+ "授課教師: " + infoData[0].instructor + '<br>' + "開課系所: " + infoData[0].department;
    Name.style = "color: #916d5d;";
    File.className = "d-flex align-self-stretch flex-wrap";
    var All_file = Datajson.files;
    All_file = All_file.sort();
    
    for (j=0; j<All_file.length; j++){
        var smol_file = document.createElement('a');
        smol_file.innerHTML = All_file[j];
        smol_file.href = raw_remote + infoData[0].course_id + "/" + file_temp.year + "/" + file_temp.class_num + "/" + All_file[j];
        smol_file.style = "text-decoration:none;";
        smol_file.className = "col-5 m-2 btn btn-light fw-bold text-start";
        smol_file.target = "_blank";
        File.appendChild(smol_file);
    }
    Download.href = remote + infoData[0].course_id + "/" + file_temp.year + "/" + file_temp.class_num;
    Download.innerHTML = "Download Zip";
    Download.style = "text-decoration:none;"
    Download.className = "col-5 m-2 btn btn-outline-light fw-bold ";
    Download.target = "_blank";
    Body.appendChild(Co_name);
    Body.appendChild(Eng);
    Body.appendChild(Year_sem);
    Body.appendChild(Name);
    Body.appendChild(Download);
    Body.appendChild(File);
    card.appendChild(Body);
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

function Separate(url){
    var temp1 = url.split("=");
    if (temp1[0] != "?co_no"){
        throw "Wrong url.";
    }
    var temp2 = temp1[1].split("&");
    if (temp2[1] != "year_sem"){
        throw "Wrong url.";
    }
    var temp3 = temp1[2].split("&");
    if (temp3[1] != "class_co"){
        throw "Wrong url.";
    }
    var temp4 = temp1[3].split("&");
    var file_name = {'co_no': temp2[0], 'year': temp3[0], 'class_num': temp4[0]};
    return file_name;
}

function Lastlink(text){
    var a = document.createElement('a');
    a.href = text
    a.className = "fs-6";
    a.style = "color: #b5424f; text-decoration:none;";
    a.innerHTML = '<img src="pic/back.svg" width="40" height="40">' + '<br>' + "回上一頁";
    last.appendChild(a);
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