/**
 * Created by ducnt114 on 1/1/17.
 */


var data = {
  "type": "get_subject_list"
};

var payload = JSON.stringify(data);

sock.send(payload);