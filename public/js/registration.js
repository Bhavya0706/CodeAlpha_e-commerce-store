const form = document.getElementById("registerForm");

form.addEventListener("submit", function(event){

    const name =
        document.querySelector('input[name="name"]').value.trim();

    const email =
        document.querySelector('input[name="email"]').value.trim();

    const password =
        document.querySelector('input[name="password"]').value;

    const error =
        document.getElementById("errorMessage");

    error.textContent = "";

    if(name.length < 3){
        event.preventDefault();
        error.textContent =
            "Name must contain at least 3 characters.";
        return;
    }

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){
        event.preventDefault();
        error.textContent =
            "Please enter a valid email address.";
        return;
    }

    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if(!passwordPattern.test(password)){
        event.preventDefault();
        error.textContent =
            "Password must contain uppercase, lowercase, number and minimum 8 characters.";
        return;
    }

});