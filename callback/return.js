const axios = require('axios');
function welcome() {
  axios.get("https://reqres.in/api/users?page=1").then(function(response) {
      if (response.status == 200) {
        console.log(response.data.page)
       response.data.page
      }
  }, function(error) {
    console.log(error.response.status)
  }
  );
  return 100;
}


console.log(welcome())
