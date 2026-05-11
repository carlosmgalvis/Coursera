    // Email regex (basic validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password regex: Min 8 chars, at least 1 number & 1 special char
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

    export {
        emailRegex,
        passwordRegex,
    };