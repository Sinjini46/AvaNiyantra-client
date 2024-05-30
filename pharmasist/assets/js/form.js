var counter = 0;
var elementCreated = false; // Flag to check if at least one element is created

function createNewElement() {
  // Incremental counter for unique IDs
  // let counter = 1;

  // create a DIV element.
  var txtNewInputBox1 = document.createElement("div");
  txtNewInputBox1.innerHTML = `
    <div class="container">
      <div class="row g-2">
        <div class="col-lg-6">
          <label for="inputmedicinename${counter}" class="form-label">Medicine Name</label>
          <input type="text" class="form-control" id="inputmedicinename${counter}" required>
        </div>
        <div class="col-lg-6">
          <label for="inputmedicinedosage${counter}" class="form-label">Medicine Dosage</label>
          <input type="number" class="form-control" id="inputmedicinedosage${counter}" required>
        </div>
      </div>
    </div>`;

  // Increment the counter for the next set of elements
  counter++;

  // Set the flag to true after at least one element is created
  elementCreated = true;

  // Append the new input fields
  document.getElementById("newForm").appendChild(txtNewInputBox1);
  console.log(counter);
}

function removeLastElement() {
  if (counter > 0) {
    // Decrement the counter
    counter--;

    // Remove the last added input fields
    const newForm = document.getElementById("newForm");
    newForm.removeChild(newForm.lastChild);
    console.log(counter);

    // If all elements are removed, set the flag to false
    if (counter === 0) {
      elementCreated = false;
    }
  }
}

function validateForm() {
  // Check if at least one element is created
  if (!elementCreated) {
    swal("Error", "Please click on '+' to add medicine name and dosage.", "error");
    return false;
  }

  // Validate Patient Name
  const patientName = document.getElementById("patientName").value;
  if (!/^[A-Za-z ]+$/.test(patientName)) {
    swal("Error", "Invalid Patient Name. Only alphabets and spaces are allowed.", "error");
    return false;
  }

  // Validate Patient Contact Number
  const patientContactNumber = document.getElementById("inputphone").value;
  if (!/^[0-9]{10}$/.test(patientContactNumber)) {
    swal("Error", "Invalid Patient Contact Number. Please enter a 10-digit number.", "error");
    return false;
  }

  // Validate Doctor's Name
  const doctorName = document.getElementById("doctorName").value;
  if (!/^[A-Za-z ]+$/.test(doctorName)) {
    swal("Error", "Invalid Doctor's Name. Only alphabets and spaces are allowed.", "error");
    return false;
  }

  // Validate Doctor's Registration Number
  const doctorRegNumber = document.getElementById("inputdocreg").value;
  if (!/^[0-9]+$/.test(doctorRegNumber)) {
    swal("Error", "Invalid Doctor's Registration Number. Only numeric values are allowed.", "error");
    return false;
  }

  // Validate Medicine Name and Dosage
  for (let i = 0; i < counter; i++) {
    const medicineName = document.getElementById("inputmedicinename" + i).value;
    const medicineDosage = document.getElementById("inputmedicinedosage" + i).value;

    if (!medicineName || !medicineDosage) {
      swal("Error", "Please fill out all fields, including medicine name and dosage.", "error");
      return false;
    }
  }

  return true;
}

function update_medicine(update_med) {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(update_med),
  };
  fetchRes = fetch((url = "https://avaniyantra-server.vercel.app/medicine/update"), options);
  fetchRes
    .then((res) => res.json())
    .then((d) => {
      console.log("Update:", d.msg);
    });
}

function check_elements_present(required_data, user_data, user_id) {
  var status = 0;
  required_data.forEach((itemA) => {
    var flag = 0;

    for (let i = 0; i < user_data.length; i++) {
      if (user_data[i].name.toLowerCase() === itemA.med_name.toLowerCase()) {
        flag = 1;
        if (user_data[i].quantity < itemA.dose) {
          swal(
            "Insufficient Stock",
            `${user_data[i].name} is not in sufficient amount`,
            "error"
          );
          status = 1;
          return 0;
        } else {
          user_data[i].quantity = user_data[i].quantity - itemA.dose;
          updated_data = {
            _id: user_data[i]._id,
            quantity: user_data[i].quantity,
          };
          console.log(user_id);
          // console.log(updated_data)
          update_medicine(updated_data);
        }
      }
    }
    if (flag == 0) {
      swal(
        "Medicine Not Found",
        `${itemA.med_name} is not there in our stock`,
        "error"
      );
      status = 1;
      return 0;
    }
  });
  if (status == 1) {
    return 0;
  }
  return 1;
}

function add_details(requestData) {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(requestData),
  };
  let fetchRes = fetch((url = "https://avaniyantra-server.vercel.app/pharma/add"), options);
  fetchRes
    .then((res) => res.json())
    .then((d) => {
      console.log("Addition of Patient Details :", d.msg);
    });
}

const button = document.getElementById("pharmacistorder");
button.addEventListener("click", (e) => {
  e.preventDefault();
   // Validate the form before submission
   if (!validateForm()) {
    return;
  }
  const patientName = document.getElementById("patientName").value;
  const patientContactNumber = document.getElementById("inputphone").value;
  const doctorName = document.getElementById("doctorName").value;
  const doctorRegNumber = document.getElementById("inputdocreg").value;
  const medicines = [];
  for (let i = 0; i < counter; i++) {
    medicines.push({
      med_name: document.getElementById("inputmedicinename" + i).value,
      dose: document.getElementById("inputmedicinedosage" + i).value,
    });
  }
  user = {
    id: localStorage.getItem("user"),
  };

  const requestData = {
    patientName,
    patientContactNumber,
    doctorName,
    doctorRegNumber,
    medicines,
  };

  let options1 = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  };

  console.log(requestData);
  console.log(counter);

  let fetchRes1 = fetch((url = "https://avaniyantra-server.vercel.app/medicine/"), options1);
  fetchRes1
    .then((res) => res.json())
    .then((d) => {
      if (d.msg == "done") {
        console.log(d.data);
        console.log(user.id);
        const flag = check_elements_present(medicines, d.data, user.id);
        console.log("Flag:", flag);
        if (flag == 1) {
          add_details(requestData);
          swal("Success", "Orders processed successfully.", "success").then(
            () => {
              location.reload();
            }
          );
        }
      }
    });
});
