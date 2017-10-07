const database = firebase.database().ref("/");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const address = document.getElementById("inputAddress");
const cellNumber = document.getElementById("cellNumber");
const gender = document.getElementById("gender");
const age = document.getElementById("age");

// let function'sName = (perameters) => {body}
let signup =() => {
    const usersData = {
        fName : firstName.value,
        lName : lastName.value,
        email : email.value,
        pass : password.value,
        address : address.value,
        cellNumber : cellNumber.value,
        gender : gender.value,
        age : age.value
    }
// console.log(usersData);

firebase.auth().createUserWithEmailAndPassword(usersData.email, usersData.pass)
.then(function (reference){
    // console.log(reference);
    database.child("usersData/" + reference.uid).set(usersData).then(function(){
        // location = '../signin/signin.html';
    })

})
    .catch(function(error) {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  if (errorCode == 'auth/weak-password') {
    alert('The password is too weak.');
  } else {
    alert(errorMessage);
  }
  console.log(error);
});

}
