/* <script src="myScript.js"></script> */

function deleteTodo (id) {
    console.log(typeof id);
    fetch('http://localhost:3000/todos/' + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json" 
        }
    }).then( () => {
        console.log('delete done');
        // var parentElement = document.getElementById('main-area')
        // parentElement.removeChild(toString(id));
        document.getElementById(id).remove();
    })

}

function getData() {
    fetch('http://localhost:3000/todos', {
        "method" : "GET"
    }).then((res) => {
        res.json().then((data) => {
            console.log(data);
            let parentElement = document.getElementById("main-area");
            // parentElement.innerHTML = JSON.stringify(data);
            for (var i = 0; i < data.length; i++) {
                var childElement = document.createElement("div");
                childElement.setAttribute('id', data[i].id);
                var childSpan1 = document.createElement('span');
                childSpan1.innerHTML = data[i].title + " ";
                var childSpan2 = document.createElement('span');
                childSpan2.innerHTML = data[i].description + " ";
                var childButton = document.createElement('button');
                childButton.innerHTML = "delete";
                childButton.setAttribute('onclick', 'deleteTodo('+ data[i].id +  ')')
                childElement.appendChild(childSpan1);
                childElement.appendChild(childSpan2);
                childElement.appendChild(childButton);
                // childElement.innerHTML = data[i].title;
                parentElement.appendChild(childElement);

            }
        });
    });
}

getData();

function onPress() {
    let title = document.getElementById("title").value;
    let desc = document.getElementById("desc").value;
    fetch('http://localhost:3000/todos', {
        "method": "POST",
        "body": JSON.stringify({
            "title": title,
            "description": desc
        }),
        "headers": {
            "Content-type": "application/JSON"
        }
    }).then((res) => {
        res.json().then((data) => {
            console.log(data);
            let parentElement = document.getElementById("main-area");
            var childElement = document.createElement("div");
            childElement.setAttribute('id', data.id);
            var childSpan1 = document.createElement('span');
            childSpan1.innerHTML = data.title + " ";
            var childSpan2 = document.createElement('span');
            childSpan2.innerHTML = data.description + " ";
            var childButton = document.createElement('button');
            childButton.innerHTML = "delete";
            childButton.setAttribute('onclick', 'deleteTodo('+ data.id +  ')')
            childElement.appendChild(childSpan1);
            childElement.appendChild(childSpan2);
            childElement.appendChild(childButton);
            // childElement.innerHTML = data[i].title;
            parentElement.appendChild(childElement);
        })
    });
}