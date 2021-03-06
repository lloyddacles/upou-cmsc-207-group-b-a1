document.addEventListener("init", function (event) {
  loadUsers();
});

var loadUsers = function () {
    var list = document.getElementById('usersList');

    if (list) {
        $.ajax({
            type: "GET",
            url: "../api/admin.php",
            success: function (result) {
                $.each(result, function(index, element) {
                  var onsItem = document.createElement('ons-list-item');
                  //onsItem.setAttribute('modifier', "chevron");
                  //onsItem.setAttribute('onclick', "functionName()");
                  //onsItem.innerHTML = element['username'] + ' (' + element['email'] + ')';

                  var div = document.createElement('div');  
                  div.setAttribute('class', "right");

                  var centerDiv = document.createElement('div');  
                  centerDiv.setAttribute('class', "center");
                  centerDiv.innerHTML = element['username'] + ' (' + element['email'] + ')';

                  var leftDiv = document.createElement('div');  
                  leftDiv.setAttribute('class', "left");

                  var onsStatus = document.createElement('ons-icon');
                  onsStatus.setAttribute('icon', 'md-circle');
                  if (element['active'] === '1') onsStatus.setAttribute('style', 'color: green');
                  leftDiv.appendChild(onsStatus);

                  var editButton = document.createElement('ons-button');  
                  editButton.setAttribute('onclick', "location.href = 'edit.php?id="+element['id']+"'"); 
                  editButton.innerHTML = "Edit";
                  div.appendChild(editButton);

                  var delButton = document.createElement('ons-button');  
                  delButton.setAttribute('onclick', "deleteUser("+element['id']+")"); 
                  delButton.innerHTML = "Delete";
                  div.appendChild(delButton);

                  onsItem.appendChild(leftDiv);
                  onsItem.appendChild(centerDiv);
                  onsItem.appendChild(div);
                  onsItem.setAttribute('id', element['id']);

                  list.appendChild(onsItem);
                });
              
            },

            dataType: "json"
        });
    }
};

var deleteUser = function (id) {
  ons.notification.confirm({
    message: 'Are you sure you want to delete user?',
    callback: function(answer) {    
    if(answer == 1)
    {
      var list = document.getElementById('usersList');
      var item = document.getElementById(id);

      $.ajax({
        type: "POST",
        url: "../api/deleteUser.php",
        data: JSON.stringify({
          id: id,
        }),
        success: function (result) {
          list.removeChild(item);
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      });
    }
    }
  });
};
