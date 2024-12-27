const person = {
    name: 'ashok',
    age: 37,
  };
  
  let number = [1, 2, 3, 4, 5];
  
  console.log(person.name);
  console.log(person.age);
  
  // number.forEach(function (element) {
  //   console.log(element);
  // });
  
  let resultarray = number.map(function (element) {
    return element * 2;
  });
  
  // resultarray.forEach(function (element) {
  //   console.log(element);
  // });
  
  let entries = Object.entries(person);
  //console.log(entries);
  
  //filter will iterate through all element and do test, whoever pass the test return those only
  // let filterarray=number.filter(function(element){
  //   //console.log(element%2);
  //   return (element%2)===0;
  // });
  
  //with array function
  let filterarray = number.filter(element => element % 2 === 0);
  filterarray.forEach(function (element) {
    console.log(element);
  });
  
  //accumulative value of element and returing single value , we use reducer function
  let finalValue = number.reduce((sum, num) => sum + num,0);
  
  console.log('final value ' + finalValue);


  function outerfunction(){
    let count=0;

    return function(){
        count++;
        console.log('inner function:'+count);;
    }

    console.log('outer function closing');
  }
  

  let counter=outerfunction();
  counter();
  counter();



  function fetchData(callback){
   setTimeout(function(){
    const data="async data";
    console.log('time out ');
    callback(data);
   },1000) ;
  }

  function processResult(result){
    console.log('process result :',result);
  }

  fetchData(processResult);