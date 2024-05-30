let cart = {}; // Object to store items in the cart
let cartRows = {}; // Object to store references to the created rows

function parcel_delete(id, med_id) {
    data = {
        "_id": id,
        "med_id": med_id
    }
    console.log(data)
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }

    let fetchRes = fetch(url = "https://avaniyantra-server.vercel.app/parcel/delete_cart_medicines", options);
    fetchRes.then(res => res.json())
        .then(d => {
            if (d.msg == "Medicine deleted successfully") {
                swal("Medicine Deleted", "The selected medicine has been deleted from the cart.", "success").then(() => {
                    location.reload();
            })
            }
        })
}

async function updateCart(item) {
    const itemNameLowercase = item.name.toLowerCase();

    if (cart[itemNameLowercase]) {
        // Item already exists in the cart, update the quantity
        cart[itemNameLowercase].quantity += item.quantity;
        let existingRow = cartRows[itemNameLowercase];
        let cartDiv = document.getElementById("cart");
        if (existingRow) {
            let tdList = cartDiv.querySelectorAll('.cart-item td')
            let tdToUpdate;
            // Loop through each td to find the one containing the item's name
            for (let td of tdList) {
                if (td.innerText.trim().toLowerCase() == itemNameLowercase) {
                    td.nextElementSibling.innerText = cart[itemNameLowercase].quantity;
                    break;
                }
            }
        } else {
            console.error(`Existing row not found for item ${item.name}`);
        }
    } else {
        // Item does not exist in the cart, add it
        cart[itemNameLowercase] = {
            quantity: item.quantity,
        };

        // Create a new row and append it to the table
        let tr = document.createElement("tr");
        let td_name = document.createElement("td");
        let td_quantity = document.createElement("td");

        let n = document.createTextNode(item.name);
        let q = document.createTextNode(cart[itemNameLowercase].quantity);

        td_name.appendChild(n);
        td_quantity.appendChild(q);

        tr.appendChild(td_name);
        tr.appendChild(td_quantity);
        tr.classList.add('cart-item'); // Add a class to the row for easier selection
        let td_actions = document.createElement("td");
        let del = document.createElement('i');
        del.setAttribute("class", "fa fa-trash")
        del.setAttribute("style", "font-size: 24px; margin-right: 20px;")
        del.setAttribute("id", item._id, "med_id", item.med_id);
        del.addEventListener("click", (e) => {
            id = e.target.id
            med_id = item.med_id
            parcel_delete(id, med_id)
        })

        //td_actions.appendChild(edit);
        td_actions.appendChild(del);
        tr.appendChild(td_actions);
        document.getElementById("cart").appendChild(tr);

        // Save reference to the created row
        cartRows[itemNameLowercase] = tr;
    }
}


async function fetchData() {
    let id = {
        "user_id": localStorage.getItem("user")
    };

    let opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(id)
    };

    try {
        let response = await fetch("https://avaniyantra-server.vercel.app/parcel/get_parcels_id", opt);
        let data = await response.json();

        for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].active == true) {
                // Update or add item to the cart
                updateCart(data.data[i]);
            }
        }

        console.log(cart);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Call the fetchData function to start the process
fetchData();