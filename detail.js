var raw_remote = "https://raw.githubusercontent.com/Darkborderman/schoolWorks/develop/api/static/"
var remote = "https://download-directory.github.io/?url=https://github.com/"
var file_raw = "https://raw.githubusercontent.com/auyu0408/fire_bone/master/file_simulate/"
var last_href = "course.html?co_no=";

//search bar
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

var requestURL = "file_simulate/" + file_temp.co_no + "/" + file_temp.year + "/data.json";
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
        Lastlink(last_href+ infoD[0].Co_no);
        showDetail(Data, infoD);
    }
    catch(e){
        Error_message(e);
        Lastlink("index.html");
    }
}

function showDetail(Datajson, infoData){
    var Body = document.createElement('div');
    var Co_no = document.createElement('h4');
    var Year_sem = document.createElement('h5');
    var Name = document.createElement('p');
    var File = document.createElement('div');
    var Download = document.createElement('a');
    Body.className = "card-body";
    Co_no.innerHTML = infoData[0].Co_no;
    Co_no.style = "color: #733830;";
    Year_sem.innerHTML = "開課學年: " + infoData[0].Year_sem;
    Year_sem.style = "color: #733830;";
    Name.innerHTML = "課程名稱: " + infoData[0].Name + '<br>' + "授課教師: " + infoData[0].Teacher + '<br>'+ "開課系所: " + infoData[0].Department;
    Name.style = "color: #916d5d;";
    File.className = "d-md-block";
    var All_file = Datajson[file_temp.class_num].file;
    
    for (j=0; j<All_file.length; j++){
        var smol_file = document.createElement('a');
        smol_file.innerHTML = All_file[j];
        smol_file.href = raw_remote + infoData[0].co_no + "/" + file_temp.year + "/" + file_temp.class_num + "/" + All_file[j];
        smol_file.style = "text-decoration:none;"
        smol_file.className = "col-3 m-2 btn btn-light fw-bold";
        smol_file.target = "_blank";
        File.appendChild(smol_file);
    }
    Download.href = remote + infoData[0].co_no + "/" + file_temp.year + "/" + file_temp.class_num;
    Download.innerHTML = "Download Zip";
    Download.style = "text-decoration:none;"
    Download.className = "col-3 m-2 btn btn-outline-light fw-bold";
    Download.target = "_blank";
    Body.appendChild(Co_no);
    Body.appendChild(Year_sem);
    Body.appendChild(Name);
    Body.appendChild(File);
    Body.appendChild(Download)
    card.appendChild(Body)
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

function Separate(url){
    var temp1 = url.split("=");
    if (temp1[0] != "?co_no"){
        throw "Wrong url.";
    }
    var temp2 = temp1[1].split("&");
    if (temp2[1] != "year_sem"){
        throw "Wrong url.";
    }
    var temp3 = temp1[2].split("/");
    var file_name = {'co_no': temp2[0], 'year': temp3[0], 'class_num': temp3[1]};
    return file_name;
}

function Lastlink(text){
    var a = document.createElement('a');
    a.href = text
    a.className = "fs-6";
    a.style = "color: #e3a576; text-decoration:none;";
    a.innerHTML = '<img src="pic/back.svg" width="40" height="40">' + '<br>' + "回上一頁";
    last.appendChild(a);
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