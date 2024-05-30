const button = document.getElementById('login');
button.addEventListener('click', () => {

    user = {
        "email": document.getElementById('username').value,
        "password": document.getElementById('password').value
    };

    if (!user.email || !user.password) {
        swal("Error", "Please fill out both email and password", "error");
        return;
    }

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    };

    let fetchRes = fetch(url = "http://127.0.0.1:8000/user/authenticate", options);
    fetchRes.then(res => res.json()).then(d => {
        console.log(d);
        if (d.msg == 'Login successful') {
            swal("Success", "Login successful", "success").then(() => {
                localStorage.setItem('user', d.data._id);
                localStorage.setItem('type', d.data.category);
                const category = d.data.category;
                console.log(category);
                if (category == 'Manufacturer') {
                    location.replace('../manufacturer/manufacturer.html');
                } else if (category == 'Wholesaler') {
                    location.replace('../wholesaler/wholesaler.html');
                } else if (category == 'Pharmacist') {
                    location.replace('../pharmasist/pharmasist.html');
                }
            });
        } else {
            swal("Error", d.msg, "error");
        }
    });
});
