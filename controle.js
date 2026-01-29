document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const passwordInput = document.getElementById('password');
    const messageInput = document.getElementById('message');
    const validationData = new WeakMap();

    validationData.set(nameInput, {
        displayName: 'Full Name',
        minLength: 3,
        required: true
    });

    validationData.set(emailInput, {
        displayName: 'Email',
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        emailError: "Please enter a valid email address",
        required: true
    });

    validationData.set(subjectInput, {
        displayName: 'Subject',
        required: true
    });

    validationData.set(passwordInput, {
        displayName: 'Password',
        minLength: 8,
        required: true
    });

    validationData.set(messageInput, {
        displayName: 'Message',
        required: true
    });

    console.log("--- WeakMap Content Verification on Load ---");
    [nameInput, emailInput, subjectInput, passwordInput, messageInput].forEach(element => {
        const rules = validationData.get(element);
        console.log(`Input #${element.id} => Rules:`, rules);
    });
    console.log("------------------------------------------");

    form.addEventListener('submit', function (e) {
        let errors = [];

        function validateField(inputElement) {
            const data = validationData.get(inputElement);

            console.log(`Checking WeakMap for ${inputElement.id}...`, data);

            if (!data) return;
            const value = inputElement.value.trim();
            if (data.required && value === "") {
                errors.push(`${data.displayName} is required`);
                return;
            }

            // Check Min Length
            if (data.minLength && value.length < data.minLength) {
                errors.push(`${data.displayName} must be at least ${data.minLength} characters`);
            }

            // Check Regex Pattern
            if (data.pattern && !data.pattern.test(value)) {
                errors.push(data.emailError || `${data.displayName} is invalid`);
            }
        }

        [nameInput, emailInput, subjectInput, passwordInput, messageInput].forEach(validateField);

        if (errors.length > 0) {
            e.preventDefault();
            alert(errors.join("\n"));
        } else {
            alert("Form submitted successfully!");
        }
    });
});
