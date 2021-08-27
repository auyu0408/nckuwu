var raw_remote = "https://raw.githubusercontent.com/Darkborderman/schoolWorks/develop/api/static/"
var remote = "https://download-directory.github.io/?url=https://github.com/"
var file_raw = "https://raw.githubusercontent.com/auyu0408/fire_bone/master/file_simulate/"
var last_href = "course.html?co_no=";

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

var requestURL = file_raw + file_temp.co_no + "/" + file_temp.year + "/data.json";
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
    try{
        var Data = request.response;
        if (request.status === 404){
            throw "File not found.";
        }
        Lastlink(last_href+ Data[0].Co_no);
        showDetail(Data);
    }
    catch(e){
        Error_message(e);
        Lastlink("index.html");
    }
}

function showDetail(Datajson){
    var Body = document.createElement('div');
    var Co_no = document.createElement('h4');
    var Year_sem = document.createElement('h5');
    var Name = document.createElement('p');
    var File = document.createElement('div');
    var Download = document.createElement('a');
    Body.className = "card-body";
    Co_no.innerHTML = Datajson[0].Co_no;
    Co_no.style = "color: #733830;";
    Year_sem.innerHTML = "開課學年: " + Datajson[0].Year_sem;
    Year_sem.style = "color: #733830;";
    Name.innerHTML = "課程名稱: " + Datajson[0].Name + '<br>' + "授課教師: " + Datajson[0].Teacher + '<br>'+ "開課系所: " + Datajson[0].Department;
    Name.style = "color: #916d5d;";
    File.className = "d-md-block";
    var All_file = Datajson[0].file[file_temp.class_num];
    
    for (j=0; j<All_file.length; j++){
        var smol_file = document.createElement('a');
        smol_file.innerHTML = All_file[j];
        smol_file.href = raw_remote + Datajson[0].Co_no + "/" + Datajson[0].Year_sem + "/" + file_temp.class_num + "/" + All_file[j];
        smol_file.style = "text-decoration:none;"
        smol_file.className = "col-3 m-2 btn btn-light fw-bold";
        smol_file.target = "_blank";
        File.appendChild(smol_file);
    }
    Download.href = remote + Datajson[0].Co_no + "/" + Datajson[0].Year_sem + "/" + file_temp.class_num;
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

function Error_message(msg){
    var message = document.createElement('h4');
    message.className = "text-center";
    message.style= "color: #733830;";
    message.innerHTML = msg;
    card.appendChild(message);
}