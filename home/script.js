btn = document.getElementById('submit');

// Dictionary to store email addresses for each category
const categoryEmails = {
    "Manufacturer": new Set(),
    "Wholesaler": new Set(),
    "Pharmacist": new Set(),
};

btn.addEventListener('click', () => {
    // Get input values
    n = document.getElementById('name').value;
    c = document.getElementById('category').value;
    r = document.getElementById('registration').value;
    e = document.getElementById('email').value;
    p = document.getElementById('password-field').value;

    // Validation for empty fields
    if (!n || !c || !r || !e || !p) {
        swal("Error", "Please fill out all fields", "error");
        return;
    }

    // Validation for email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(e)) {
        swal("Error", "Invalid email address", "error");
        return;
    }

    // Validation for password (at least 8 characters with numeric and special characters)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(p)) {
        swal("Error", "Password must be at least 8 characters long and include a number and a special character", "error");
        return;
    }

    // Validation for unique email address within the category
    if (categoryEmails[c].has(e)) {
        swal("Error", "This email address is already registered for the selected category", "error");
        return;
    }

    // Add email address to the category set
    categoryEmails[c].add(e);

    user = {
        "name": n,
        "category": c,
        "registration": r,
        "email": e,
        "password": p,
    };

    console.log(user);

    // Call API for user creation
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    };

    let fetchRes = fetch(url = "https://avaniyantra-server.vercel.app/user/createuser", options);
    fetchRes.then(res => res.json())
        .then(d => {
            console.log(d);
            if (d.msg == "An account with same email is present") {
                swal("Error", "An account with the same email is already present", "error");
            } else {
                swal("Success", "Signup completed", "success").then(() => {
                    location.replace('./login.html');
                });
            }
        });
});
