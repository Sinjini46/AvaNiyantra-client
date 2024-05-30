user = {
    "id": localStorage.getItem("user")
}
let options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
}

let fetchRes = fetch(url = "http://127.0.0.1:8000/medicine/", options);
fetchRes
    .then(res => res.json())
    .then(d => {
        container = document.getElementById("container")
        console.log(d)
        if (d.msg == "done") {
            for (i = 0; i < d.data.length; i++) {
                tr = document.createElement("tr")
                td1 = document.createElement("td")
                td2 = document.createElement("td")
                td2.setAttribute("id", `name-${d.data[i]['_id']}`)
                td3 = document.createElement("td")
                tq = document.createElement("td")
                tq.setAttribute("id", `max-${d.data[i]['_id']}`)
                value = document.createElement("td")
                td4 = document.createElement("td")

                count = document.createTextNode(i + 1)
                n = document.createTextNode(d.data[i]['name'])
                l = document.createTextNode(d.data[i]['level'])
                q = document.createTextNode(d.data[i]['quantity'])

                edit = document.createElement('i')
                edit.appendChild(document.createTextNode("+"))
                edit.setAttribute("class", "btn btn-primary btn-circle btn-sm")
                edit.setAttribute("id", d.data[i]['_id'])


                edit.addEventListener("click", (e) => {
                    console.log(Number(document.getElementById(`quantity-${e.target.id}`).innerHTML))
                    if (Number(document.getElementById(`quantity-${e.target.id}`).innerHTML) > Number(document.getElementById(`max-${e.target.id}`).innerHTML)) {
                         swal("Limit exceeded", "The selected medicine is not in sufficient stock.", "error")
                    }
                    else if (Number(document.getElementById(`quantity-${e.target.id}`).innerHTML) == 0){
                        swal("Error", "Null value cannot be added to the cart.", "error")
                    }
                    else {
                        parcel = {
                            "user_id": localStorage.getItem("user"),
                            "med_id": e.target.id,
                            "name": document.getElementById(`name-${e.target.id}`).innerHTML,
                            "quantity": Number(document.getElementById(`quantity-${e.target.id}`).innerHTML),
                            "active": true
                        }
                        console.log(parcel)
                        let options = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            },
                            body: JSON.stringify(parcel)
                        }

                        let fetchRes = fetch(url = "http://127.0.0.1:8000/parcel/create_parcel", options);
                        fetchRes.then(res => res.json())
                            .then(d => {
                                swal("Added to cart", "The medicine has been successfully added to cart.", "success").then(() => {
                                    location.reload();
                            })
                                console.log(d)
                            })
                    }
                })


                td1.appendChild(count)
                td2.appendChild(n)
                td3.appendChild(l)
                tq.append(q)

                a = document.createElement("div")
                a.setAttribute("class", "count_container")
                inc_class = document.createElement("div")
                inc_class.setAttribute("id", d.data[i]['_id'])
                inc_class.setAttribute("class", "controller")
                inc = document.createTextNode("+")
                inc_class.appendChild(inc)
                inc_class.addEventListener("click", (e) => {
                    x = document.getElementById(`quantity-${e.target.id}`)
                    no = Number(x.innerHTML)
                    no += 1
                    x.innerHTML = String(no)
                })

                count_class = document.createElement("div")
                count_class.setAttribute("id", `quantity-${d.data[i]['_id']}`)
                count = document.createTextNode("0")
                count_class.appendChild(count)

                dec_class = document.createElement("div")
                dec_class.setAttribute("id", d.data[i]['_id'])
                dec_class.setAttribute("class", "controller")
                dec = document.createTextNode("-")
                dec_class.appendChild(dec)
                dec_class.addEventListener("click", (e) => {
                    x = document.getElementById(`quantity-${e.target.id}`)
                    no = Number(x.innerHTML)
                    if (no != 0) {
                        no -= 1
                        x.innerHTML = String(no)
                    }
                })

                a.appendChild(dec_class)
                a.appendChild(count_class)
                a.appendChild(inc_class)

                value.appendChild(a)

                td4.appendChild(edit)

                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tr.appendChild(tq)
                tr.appendChild(value)
                tr.appendChild(td4)

                container.appendChild(tr)
            }
        }

    })