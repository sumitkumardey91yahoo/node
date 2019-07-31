
function add(data,cb) {
  console.log(data);
  setTimeout(()=>{

    cb();
  },data);
}


// add(1000,function() {
//   console.log("i am sub");
// });


const wait = time => new Promise((resolve) => setTimeout(resolve, time));

wait(3000).then(() => console.log('Hello!')); // 'Hello!'
