var raw_remote = "https://raw.githubusercontent.com/Darkborderman/schoolWorks/develop/api/static/"
var remote = "https://download-directory.github.io/?url=https://github.com/Darkborderman/schoolWorks/tree/develop/api/static/"
var last_href = "course.html?co_no=";

//search bar
var input_bar = document.getElementById('q');
var list = document.getElementById('list');
var endpoint = raw_remote + "index.json";
var index_data, file_temp, course_url, course_data;
var card = document.getElementById('card');
var last = document.getElementById('last');
var url = location.search;

$.ajax({
    url: endpoint,
    method: "GET",
    dataType: "json",
    success: function(response){
        index_data = response;
    }
});

try{
    file_temp = separate_url(url);
}
catch(e){
    error_message(e);
}

course_url = raw_remote + file_temp.co_no + "/" + file_temp.year + "/" + file_temp.class_num + ".json";
$.ajax({
    url: course_url,
    method: "GET",
    dataType: "json",
    success: function(response){
        course_data = response;
        get_detail();
    },
    error: function(){
        error_message("File not found.");
        last_link("index.html");
    }
});

input_bar.oninput=function(){
    text = this.value;
    if (text == ''){
        list.innerHTML = '';
    }else{
        var new_data = filter_text(text.toUpperCase(), index_data);
        show_bar(new_data);
    }
}

function get_detail(){
    var info = filter_text(file_temp.co_no, index_data);
    info = info.sort(function(a,b){
        return b.year - a.year;
    });
    last_link(last_href+ info[0].course_id);
    show_detail(course_data, info);
}

function show_detail(detail, info){
    var body = document.createElement('div');
    var co_name = document.createElement('h4');
    var en = document.createElement('h5');
    var year_sem = document.createElement('h5');
    var name = document.createElement('p');
    var file = document.createElement('div');
    var download = document.createElement('a');
    body.className = "card-body";
    body.style = "max-height: 450px; width:100%; overflow:scroll; overflow-y:scroll;"
    co_name.innerHTML = info[0].course_name.split(" ")[0];
    co_name.style = "color: #733830;";
    en.innerHTML = info[0].course_name.replace(info[0].course_name.split(" ")[0],"");
    en.style = "color: #733830;";
    year_sem.innerHTML = "開課學年: " + info[0].year + "-" + info[0].semester;
    year_sem.style = "color: #733830;";
    name.innerHTML = "課程碼: " + info[0].course_id + '<br>' + "分班碼:" +
    file_temp.class_num + '<br>'+ "授課教師: " + info[0].instructor + '<br>' + "開課系所: " + info[0].department;
    name.style = "color: #916d5d;";
    file.className = "d-flex align-self-stretch flex-wrap";
    var all_file = detail.files;
    all_file = all_file.sort();
    
    for (j=0; j < all_file.length; j++){
        var smol_file = document.createElement('a');
        smol_file.innerHTML = all_file[j];
        smol_file.href = raw_remote + info[0].course_id + "/" + file_temp.year + "/" + file_temp.class_num + "/" + all_file[j];
        smol_file.style = "text-decoration:none;";
        smol_file.className = "col-5 m-2 btn btn-light fw-bold text-start";
        smol_file.target = "_blank";
        file.appendChild(smol_file);
    }
    download.href = remote + info[0].course_id + "/" + file_temp.year + "/" + file_temp.class_num;
    download.innerHTML = "Download Zip";
    download.style = "text-decoration:none;"
    download.className = "col-5 m-2 btn btn-outline-light fw-bold ";
    download.target = "_blank";
    body.appendChild(co_name);
    body.appendChild(en);
    body.appendChild(year_sem);
    body.appendChild(name);
    body.appendChild(download);
    body.appendChild(file);
    card.appendChild(body);
}

function separate_url(url){
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

function last_link(text){
    var a = document.createElement('a');
    a.href = text
    a.className = "fs-6";
    a.style = "color: #b5424f; text-decoration:none;";
    a.innerHTML = '<img src="pic/back.svg" width="40" height="40">' + '<br>' + "回上一頁";
    last.appendChild(a);
}