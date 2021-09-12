var endpoint = "https://raw.githubusercontent.com/Darkborderman/schoolWorks/develop/api/static/index.json"

var input_bar = document.getElementById('q');
var list = document.getElementById('list');
var index_data, temp;
var card = document.getElementById('card');
var title = document.getElementById('Co_no');
var url = location.search;

$.ajax({
    url: endpoint,
    method: "GET",
    dataType: "json",
    success: function(response){
        index_data = response;
        search_course();
    },
    error: function(err){error_message(err)},
});

try{
    temp = url.split("=");
    if (temp[0] != "?co_no"){
        throw "Wrong url.";
    }
    temp1 = temp[1].split("&");
}
catch(e){
    error_message(e);
}

input_bar.oninput=function(){
    text = this.value;
    if (text == ''){
        list.innerHTML = '';
    }else{
        var new_data = filter_text(text.toUpperCase(), index_data);
        show_bar(new_data);
    }
}

function search_course(){
    try{
        info = filter_text(temp1[0], index_data);
        if (info == ''){
            throw "File not found.";
        }
        info = info.sort(function(a,b){
            return b.year - a.year;
        });
        show_course(info);
        show_detail(info);
    }
    catch(e){
        error_message(e);
    }
}

function show_course(data){
    var course = document.createElement('h3');
    var en = document.createElement('h5');
    course.innerHTML = ' &nbsp;&nbsp;'+ data[0].course_name.split(" ")[0];
    course.className = "fw-bold";
    course.style = "color: #b5424f;";
    en.innerHTML = ' &nbsp;&nbsp;'+ data[0].course_name.replace(data[0].course_name.split(" ")[0],"");
    en.style = "color: #c1535c;";
    title.appendChild(course);
    title.appendChild(en);
}

function show_detail(info){
    for (i=0; i < info.length; i++){
        var Col = document.createElement('div');
        var Card = document.createElement('a');
        var Body = document.createElement('div');
        var Title = document.createElement('h5');
        var Detail = document.createElement('p');
        Col.className = "col-6";
        Card.className = "card m-1 list-group-item-action shadow";
        Card.href = "detail.html?co_no=" + info[i].course_id + "&year_sem=" + info[i].year + "_" + info[i].semester + "&class_co=" + info[i].class_code;
        Body.className = "card-body";
        Title.className = "card-title";
        Title.innerHTML = "開課學年: " + info[i].year + "-" + info[i].semester;
        Title.style = "color: #733830;";
        Detail.innerHTML = "課程碼: " + info[0].course_id + '<br>' + "開課系所: " + info[0].department.substr(0,3) 
        + '<br>' + "授課教師: " + info[i].instructor + '<br>' + "班級" + info[i].class_code + ' &nbsp;';
        Detail.style = "color: #733830;";
        Card.style = "text-decoration:none;"
        Body.appendChild(Title);
        Body.appendChild(Detail);
        Card.appendChild(Body);
        Col.appendChild(Card);   
        card.appendChild(Col)
    }
}