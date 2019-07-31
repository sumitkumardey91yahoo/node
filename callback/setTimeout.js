
function add(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("i am add", a+b);
    }, 3000)
  });
}


function sub() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      add(1,3).then((res) =>{
        console.log(res);
      });
      console.log("i am sub");
    }, 3000)
  });
}

sub();
