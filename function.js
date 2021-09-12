function show_bar(data){
    list.innerHTML = '';
    data = data.sort(function(a,b){
        return a.course_id > b.course_id;
    });
    var temp = "";
    var select = document.createElement('div');
    select.className = "list-group";
    for (i=0; i < data.length; i++){
        if (temp.course_id === data[i].course_id){
            continue;
        }
        var Link = document.createElement('a');
        var Name = document.createElement('div');
        var Department = document.createElement('span');
        Link.href = "course.html?co_no=" + data[i].course_id;
        Link.className = "list-group-item d-flex list-group-item-action";
        Name.innerHTML = '&nbsp' + data[i].course_name.split(" ")[0];
        Name.className = "me-auto";
        Name.style = "color: #733830;"
        Department.innerHTML = data[i].department.substr(0,3);
        Department.className = "badge rounded-pill badge-outline-primary";
        Link.appendChild(Department);
        Link.appendChild(Name);
        select.appendChild(Link);
        temp = data[i];
    }
    list.appendChild(select);
}

function filter_text(key, origin_data){
    return origin_data.filter(function(elem, index){
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

function error_message(msg){
    var message = document.createElement('h4');
    message.className = "text-center";
    message.style= "color: #733830;";
    message.innerHTML = msg;
    card.appendChild(message);
}
