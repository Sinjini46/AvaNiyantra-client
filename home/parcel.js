let options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ "parcel_id": sessionStorage.getItem("parcel_id") })
}

let fetchRes = fetch(url = "https://avaniyantra-server.vercel.app/parcel/get_all_parcels", options);
fetchRes
    .then(async res => res.json())
    .then(async d => {
        if (d.msg == "done")
         {
            container = document.getElementById("container")
            for (i = 0; i < d.data.length; i++) {
                s = document.createTextNode(i + 1)
                n = document.createTextNode(d.data[i].name)
                q = document.createTextNode(d.data[i].quantity)

                td1 = document.createElement("td")
                td2 = document.createElement("td")
                td3 = document.createElement("td")

                tr = document.createElement("tr")
                td1.appendChild(s)
                td2.appendChild(n)
                td3.appendChild(q)

                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)

                container.appendChild(tr)
            }
        }
    })
