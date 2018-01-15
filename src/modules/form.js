module.exports = () => {
  // function ajax(url, callback) {
  //   let xhr = new XMLHttpRequest();
  //   xhr.open('POST', url);
  //   xhr.onreadystatechange = function(){
  //     if(this.readyState == 4){
  //       if(this.status == 200){
  //         callback(JSON.parse(this.responseText));
  //       }
  //       else console.log('something wrong')
  //     }
  //     else console.log('something wrong')
  //   }
  //   xhr.send('hisend');
  // }

  // // let data = {
  // //   "hi": 'hi'
  // // }
  // ajax('php/form.php', function(data){
  //   alert(JSON.stringify(data))
  // });

  let form = document.querySelector('.form')

  if(form){

  let formInputs = document.querySelectorAll('.form__input')
  let formClean = document.querySelector('.form__clean')
    form.addEventListener('submit', event => {
      // event.preventDefault()
      ///////////////
    })
    formClean.addEventListener('click', event => {
      formInputs.forEach(formInput => {
        formInput.value = ''
      });
    })
  }
}