
const axios = require('axios');
function getData(url) {
  return new Promise(function(resolve, reject) {
    axios.get(url).then(function(response) {
      if (response.status == 200) {
          resolve(response);
      } else {
        reject("not found");
      }
    }, function(error) {
      reject(error);
    }
    );
  });
}




getData("https://reqres.in/api/users?page=1").then((res) =>{
  console.log(res.data.page);
  let data = parseInt(res.data.page) + 1;
  getData("https://reqres.in/api/users?page="+ data).then((res) =>{
    console.log(res.data.page);
    data = parseInt(res.data.page) + 1;
    getData("https://reqres.in/api/users?page=", data).then((res) =>{
      data = parseInt(res.data.page) + 1;
      getData("https://reqres.in/api/users?page=", data).then((res) =>{
        console.log(res.data.page);
      });
    });

  });
},(error) =>{
  console.log(error)
});
