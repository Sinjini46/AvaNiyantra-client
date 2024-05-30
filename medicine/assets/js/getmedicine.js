/* function edit() {
    console.log('edit')
}
 */
let counter = 1;
function updateMedicineList(data) {
    if (medicine[data.name]) {
        // Medicine already exists in the list, update the quantity
        medicine[data.name].quantity += data.quantity;
        let existingRow = medicineRows[data.name];
        if (existingRow) {
            // Update the quantity in the existing row
            let quantityCell = existingRow.querySelector('.td_quantity');
            if (quantityCell) {
                quantityCell.textContent = medicine[data.name].quantity;
            } else {
                console.error(`Quantity cell not found in existingRow for medicine ${data.name}`);
            }
        } else {
            console.error(`Existing row not found for medicine ${data.name}`);
        }
    } else {
        // Medicine does not exist in the list, add it
        medicine[data.name] = {
            quantity: data.quantity,
        };

        // Create a new row and append it to the table
        let tr = document.createElement("tr");
        tr.classList.add('medicine-item'); // Add a class to the row for easier selection

        // Create and append td for medicine name
        let td_slno = document.createElement("td");
        td_slno.textContent = counter;
        tr.appendChild(td_slno);

        counter += 1;

        // Create and append td for medicine name
        let td_name = document.createElement("td");
        td_name.textContent = data.name;
        tr.appendChild(td_name);

        // Create and append td for medicine level
        let td_level = document.createElement("td");
        td_level.textContent = data.level;
        tr.appendChild(td_level);

        // Create and append td for medicine quantity
        let td_quantity = document.createElement("td");
        td_quantity.classList.add('td_quantity');
        td_quantity.textContent = medicine[data.name].quantity;
        tr.appendChild(td_quantity);

        // Create and append td for actions (edit and delete)
        let td_actions = document.createElement("td");

        let del = document.createElement('i');
        del.setAttribute("class", "fa fa-trash")
        del.setAttribute("style", "font-size: 24px; margin-right: 20px;")
        del.setAttribute("id", data._id);
        del.addEventListener("click", (e) => {
            id = e.target.id
            med_delete(id)
        })

        //td_actions.appendChild(edit);
        td_actions.appendChild(del);
        tr.appendChild(td_actions);

        document.getElementById("medicine-list").appendChild(tr);

        // Save reference to the created row
        medicineRows[data.name] = tr;
    }
}

function med_delete(id) {
    data = {
        "_id": id
    }
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }

    let fetchRes = fetch(url = "http://127.0.0.1:8000/medicine/delete", options);
    fetchRes.then(res => res.json())
        .then(d => {
            if (d.msg == "done") {
                swal("Medicine Deleted", "The selected medicine has been deleted from the medicine list.", "success").then(() => {
                    location.reload();
            })
            }
        })
}

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


let medicine = {}; // Object to store items in the medicine
let medicineRows = {}; // Object to store references to the created rows
let i = 0;

let fetchRes = fetch(url = "http://127.0.0.1:8000/medicine/", options);
fetchRes.then(res => res.json())
    .then(d => {
        container = document.getElementById("medicine-list")
        console.log(d)
        if (d.msg == "done") {
            for (i = 0; i < d.data.length; i++) {
                updateMedicineList(d.data[i]);
                /* tr = document.createElement("tr")
                td1 = document.createElement("td")
                td2 = document.createElement("td")
                td3 = document.createElement("td")
                tq = document.createElement("td")
                td4 = document.createElement("td")

                count = document.createTextNode(i + 1)
                n = document.createTextNode(d.data[i]['name'])
                l = document.createTextNode(d.data[i]['level'])
                q = document.createTextNode(d.data[i]['quantity'])

                edit = document.createElement('i')

                edit.setAttribute("id", d.data[i]['_id'])
                edit.addEventListener("click", (e) => {
                    console.log(e.target.id)
                })

                del = document.createElement('i')
                del.setAttribute("class", "fa fa-trash")
                del.setAttribute("style", "font-size: 24px; margin-right: 20px;")
                del.setAttribute("id", d.data[i]['_id'])
                del.addEventListener("click", (e) => {
                    id = e.target.id
                    med_delete(id)
                })

                td1.appendChild(count)
                td2.appendChild(n)
                td3.appendChild(l)
                tq.append(q)
                td4.appendChild(edit)
                td4.appendChild(del)

                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tr.append(tq)
                tr.appendChild(td4)

                container.appendChild(tr) */
            }
        }

    })
