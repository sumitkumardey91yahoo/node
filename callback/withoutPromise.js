const axios = require('axios');

axios.get("https://reqres.in/api/users?page=1").then(function(response) {
  let data = parseInt(response.data.page) + 1;
    if (response.status == 200) {
      console.log(response.data.page)
      data = parseInt(response.data.page) + 1;
      axios.get("https://reqres.in/api/users?page=" + data).then(function(response) {
          if (response.status == 200) {
            console.log(response.data.page)
            data = parseInt(response.data.page) + 1;
            axios.get("https://reqres.in/api/users?page=" + data).then(function(response) {
                if (response.status == 200) {
                  console.log(response.data.page)
                  data = parseInt(response.data.page) + 1;
                  axios.get("https://reqres.in/api/users?page=" + data).then(function(response) {
                      if (response.status == 200) {
                        console.log(response.data.page)

                      }
                  }, function(error) {
                    console.log(error.response.status)
                  }
                  );
                }
            }, function(error) {
              console.log(error.response.status)
            }
            );

          }
      }, function(error) {
        console.log(error.response.status)
      }
      );

    }
}, function(error) {
  console.log(error.response.status)
}
);
