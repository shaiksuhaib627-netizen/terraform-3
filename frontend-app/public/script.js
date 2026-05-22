const backendUrl = 'http://YOUR-ALB-DNS'

const loginForm = document.getElementById('loginForm')

if (loginForm) {

    loginForm.addEventListener('submit', async (e) => {

        e.preventDefault()

        const username = document.getElementById('username').value
        const password = document.getElementById('password').value

        const response = await fetch(`${backendUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })

        const data = await response.json()

        document.getElementById('message').innerHTML = data.message

        if (data.status === 'success') {
            window.location.href = 'dashboard.html'
        }
    })
}

const signupForm = document.getElementById('signupForm')

if (signupForm) {

    signupForm.addEventListener('submit', async (e) => {

        e.preventDefault()

        const username = document.getElementById('signupUsername').value
        const email = document.getElementById('signupEmail').value
        const password = document.getElementById('signupPassword').value

        await fetch(`${backendUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        })

        alert('Signup Successful')

        window.location.href = 'login.html'
    })
}