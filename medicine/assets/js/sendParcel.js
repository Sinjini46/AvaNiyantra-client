btn = document.getElementById("send")

btn.addEventListener("click", () => {
    const email = document.getElementById("email").value
    console.log(email)

    const sender_id = localStorage.getItem("user")
        //get email
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ "email": email })
    }
    const gen_recv_id = fetch(url = "https://avaniyantra-server.vercel.app/user/getuser_by_email", options);
    gen_recv_id.then(res => res.json())
        .then(d => {
            if (d.msg == "No user") {
                swal("No User Found", "The provided email does not correspond to a registered user.", "error");
            }
            else if(d.data._id==localStorage.getItem("user"))
            {
                swal("Error", "You cannot send the parcel to yourself.", "error");
            }
            else {
                recv_id = d.data._id

                let options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({ "id": sender_id })
                }

                const gen_pk_id = fetch(url = "https://avaniyantra-server.vercel.app/parcel/add_parcel_id", options);
                gen_pk_id.then(res => res.json())
                    .then(d => {

                        let uopt = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            },
                            body: JSON.stringify({
                                _id: localStorage.getItem('user')
                            })
                        }
                        const gen_name = fetch(url = "https://avaniyantra-server.vercel.app/user/get_user_by_id", uopt);
                        gen_name.then(res => res.json())
                            .then(uname => {
                                const pk_id = d.data

                                let opt = {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json;charset=utf-8'
                                    },
                                    body: JSON.stringify({
                                        "receiver_id": recv_id,
                                        "sender_id": sender_id,
                                        "name": uname.data.name,
                                        "parcel_id": pk_id
                                    })
                                }
                                const gen_batch = fetch(url = "https://avaniyantra-server.vercel.app/batch/create_batch", opt);
                                gen_batch.then(res => res.json())
                                    .then(d => {
                                        console.log(d)
                                        swal("Parcel Sent", "The parcel has been successfully sent.", "success").then(() => {
                                            location.reload();
                                        });
                                    })
                            })

                    })

            }
        })

})