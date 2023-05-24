export function validateNameInput(someNameInput) {
    if (someNameInput.trim().length < 1) {
        return false;
    }
    return true;
};

export function validateEmail(someEmail) {

    if (someEmail.trim() == '') {
        return false;
    }
    if (!someEmail.includes('@')) {
        return false;
    } else {
        if (someEmail.length === 1) {
            return false;
        }

        const shredded = someEmail.split('@');
        if (shredded.length !== 2) {
            return false;
        }

        if (!shredded[1].includes('.')) {
            return false;
        }

    }

    return true;

};

