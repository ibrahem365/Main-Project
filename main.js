
const baseUrl = "https://tarmeezacademy.com/api/v1";

setupUi();
getPosts();

function getPosts() {

    axios.get(`${baseUrl}/posts`)
        .then((response) => {
            const posts = response.data.data;

            document.getElementById("posts").innerHTML = "";

            for (post of posts) {

                let content = `
                <div class="card shadow mb-3">
                    <div class="card-header">
                        <img src="${post.author.profile_image}" alt="" class="avatar rounded-circle border border-2">
                        <b>${post.author.username}</b>
                    </div>
                    <div class="card-body">
                        <img src="${post.image}" alt="" class="w-100 rounded-1">
                        <h6 class="mt-1 text-secondary">${post.created_at}</h6>
                        <h5>${post.title}</h5>
                        <p>${post.body}</p>
                        <hr>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-pen" viewBox="0 0 16 16">
                                <path
                                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                            </svg>

                            <span>(${post.comments_count}) Comments</span>
                        </div>
                    </div>
                </div>
            `;

                document.getElementById("posts").innerHTML += content;
            }
        });
}


function logBtnClick() {
    const userName = document.getElementById("user-input").value;
    const pass = document.getElementById("pass-input").value;

    const param = {
        "username": userName,
        "password": pass
    }

    axios.post(`${baseUrl}/login`, param)
        .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            const modal = document.getElementById("loginModal");
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();


        });

    setupUi()
}

function logRegisterClick() {
    const userName = document.getElementById("user-input-reg").value;
    const pass = document.getElementById("pass-input-reg").value;
    const email = document.getElementById("email-input-reg").value;
    const fName = document.getElementById("fName-input-reg").value;

    const param = {
        "username": userName,
        "password": pass,
        "name": fName,
        "email": email
    }

    axios.post(`${baseUrl}/register`, param)
        .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            const modal = document.getElementById("registerModal");
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();

            setupUi();

        }).catch((error) => {
            console.log(error.response.data.message)
            setupUi()
        })

}

function logoutBtnClick() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setupUi()
}

function setupUi() {

    const token = localStorage.getItem("token");

    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn");
    const logoutBtn = document.getElementById("logout-btn");

    if (token == null) {

        loginBtn.style.visibility = "visible"
        registerBtn.style.visibility = "visible"
        logoutBtn.style.display = "none"

    } else {
        loginBtn.style.visibility = "hidden"
        registerBtn.style.visibility = "hidden"
        logoutBtn.style.display = "block"
    }
}