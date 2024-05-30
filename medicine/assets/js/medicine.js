type = localStorage.getItem("type");
if (type != "Manufacturer") {
  document.getElementById("man").remove();
}

// Add click event listener to the image
document
  .getElementById("direct")
  .addEventListener("click", redirectToDashboard);

function redirectToDashboard() {
  // Fetch user information from the server
  const user = {
    _id: localStorage.getItem("user"),
  };

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  };
  //console.log(options)
  let fetchRes1 = fetch(
    (url = "https://avaniyantra-server.vercel.app/user/get_user_by_id"),
    options
  );
  fetchRes1
    .then((res) => res.json())
    .then((d) => {
      if (d.msg === "done") {
        const data = d.data;
        console.log(data);
        // Assuming "category" determines the user's role for redirection
        if (data.category === "admin") {
          window.location.href = "admin_dashboard.html";
        } else if (data.category === "Manufacturer") {
          window.location.href = "../manufacturer/manufacturer.html";
        } else if (data.category === "Wholesaler") {
          window.location.href = "../wholesaler/wholesaler.html";
        } else if (data.category === "Pharmacist") {
          window.location.href = "../pharmasist/pharmasist.html";
        } else {
          alert("Unknown user role");
        }
      } else {
        console.log(d.msg);
      }
    });
}

btn = document.getElementById("submit");

btn.addEventListener("click", () => {
  n = document.getElementById("name").value;
  c = document.getElementById("narcotics_level").value;
  q = document.getElementById("quantity").value;
  g = document.getElementById("gridCheck").checked;
  if (!n || !c || !q) {
    swal("Error", "Please fill out all fields", "error");
    return;
  }

  if (!g) {
    swal("Error", "Please agree to the terms", "error");
    return;
  }

  console.log(c);
  user = {
    id: localStorage.getItem("user"),
    name: n,
    level: c,
    quantity: q,
  };

  console.log(user);

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  };
  let Result = fetch(
    (url = "https://avaniyantra-server.vercel.app/medicine/update_med_by_user"),
    options
  );
  Result.then((res) => res.json()).then((d) => {
    console.log(d.msg);
    if (d.msg == "Document updated") {
      swal("Success", "Medicine updated successfully.", "success").then(() => {
        location.reload();
      });
    } else {
      console.log("Adding Time");
      let fetchRes = fetch(
        (url = "https://avaniyantra-server.vercel.app/medicine/add"),
        options
      );
      fetchRes
        .then((res) => res.json())
        .then((d) => {
          swal("Success", "Medicine added successfully.", "success").then(
            () => {
              location.reload();
            }
          );
        });
    }
  });
});
