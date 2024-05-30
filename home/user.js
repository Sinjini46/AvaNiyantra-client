user = {
    "_id": localStorage.getItem("user")
  }
  let options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
}
let fetchRes1 = fetch(url = "http://127.0.0.1:8000/user/get_user_by_id", options);
fetchRes1.then(res => res.json())
      .then(d => {
if(d.msg== "done"){
  const data = d.data;
  document.getElementById("fullName").textContent = data.name;
  document.getElementById("role").textContent = data.category;
  document.getElementById("registration_number").textContent = data.reg;
  document.getElementById("email").textContent = data.email;
    }
else{
console.log(d.msg)}
})
