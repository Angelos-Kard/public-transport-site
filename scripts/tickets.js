//DEPRECATED

let data = '['+
'{"id":1, "typos": "meiomeno", "timi": 0.60, "zoni":"A"},' +
'{ "id":2, "typos": "kanoniko", "timi": 1.10, "zoni":"A"},' +
'{ "id":3, "typos": "meiomeno", "timi": 0.80, "zoni":"B" },' +
'{ "id":4, "typos": "epivarimeno", "timi": 2.00, "zoni":"A" },' +
'{ "id":5, "typos": "epivarimeno", "timi": 2.00, "zoni":"B" },' +
'{ "id":6, "typos": "kanoniko", "timi": 1.50, "zoni":"B" } ]';

const mydata = JSON.parse(data);

const body1 = document.querySelector("#pricing-body");