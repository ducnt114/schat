/**
 * Created by ducnt114 on 1/1/17.
 */

function getListUserByPage(pageIndex, itemPerPage) {
  var data = {
    "type": "get_user_list",
    "data": {
      "token": sessionStorage.token,
      "page": pageIndex,
      "item_per_page": itemPerPage
    }
  };

  var payload = JSON.stringify(data);

  sock.send(payload);
}

getListUserByPage(1, 10);