var endpoint = "https://raw.githubusercontent.com/Darkborderman/schoolWorks/master/api/static/index.json"

var ul = document.querySelector('ul');
var list = document.getElementById('list');
var input_bar = document.getElementById('q');
var keyword = location.search;
var index_data;

$.ajax({
    url: endpoint,
    method: "GET",
    dataType: "json",
    success: function(response){
        index_data = response;
        main_search(index_data);
    },
    error: function(err){error_message(err)},
});

input_bar.oninput = function(){
    var text = this.value;
    if (text === ""){
        list.innerHTML = '';
    }else{
        var new_data = filter_text(text.toUpperCase(), index_data);
        show_bar(new_data);
    }
}


function main_search(){
    if (keyword == ''){
    }else{
        var key = keyword.split("=");
        if (key[0] === "?q"){
            key[1] = decodeURIComponent(key[1]);
            index_data = filter_text(key[1].toUpperCase(), index_data);
        }
    }
    index_data = index_data.sort(function(a,b){
        if (a.course_id === b.course_id){
            return a.year > b.year
        }
        return a.course_id > b.course_id;
    });
    show_datas(index_data);
}

function show_datas(data){
    var temp = "";
    var select = document.createElement('div');
    select.style = "height: 450px; width:100%; overflow:hidden; overflow-y:scroll;"
    select.className = "list-group list-group-flush";
    for (i=0; i < data.length; i++){
        if (temp.course_id === data[i].course_id){
            continue;
        }
        var Link = document.createElement('a');
        var Name = document.createElement('div');
        var Co_no = document.createElement('div');
        var Department = document.createElement('span');
        Link.href = "course.html?co_no=" + data[i].course_id;
        Link.className = "list-group-item list-group-item-action";
        Name.textContent = data[i].course_name;
        Name.className = "me-auto";
        Name.style = "color: #733830;"
        Co_no.innerHTML = data[i].course_id + '&nbsp';
        str = data[i].department; 
        Department.textContent = str ? str.substr(0,3) : str;
        Department.className = "badge badge-outline-primary rounded-pill";
        Co_no.appendChild(Department);
        Link.appendChild(Co_no);
        Link.appendChild(Name);
        select.appendChild(Link);
        temp = data[i];
    }
    ul.appendChild(select);
}