module.exports = () => {
  function ajax(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onreadystatechange = function(){
      if(this.readyState == 4){
        if(this.status == 200){
          callback(JSON.parse(this.responseText));
        }
        else console.log('something wrong')
      }
      else console.log('something wrong')
    }
    xhr.send(null);
  }




  ajax('../php/form.php', function(data){
    alert(JSON.stringify(data))
  });
}