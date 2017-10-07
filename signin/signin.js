const database = firebase.database().ref('/')
const email = document.getElementById('inputEmail')
const pass = document.getElementById('inputPassword')

document.getElementById('stop').addEventListener("submit", function (event) {
        event.preventDefault()
        const loggedinUser = {
            email: email.value,
            password: pass.value
        }

        firebase.auth().signInWithEmailAndPassword(loggedinUser.email, loggedinUser.password)
            .then(function (reference) {
                // console.log(reference.uid)
                database.child('usersData/' + reference.uid).once('value', function (snapshot) {
                        const convert = JSON.stringify(snapshot.val())
                        localStorage.setItem('loggedinUser', convert)
                        // location = '../home/home.html'
                        // console.log(convert)
                    })
            })
            .catch(function (error) {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });

    })