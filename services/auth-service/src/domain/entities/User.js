class User {
    constructor( { id, email, phone, password, role, username } ) {
        this.id = id;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.role = role || 'customer';
        this.username = username || 'Khách lẻ';
    }

    validate() {
        if (!this.phone) {
            throw new Error('Phone number is required');
        }
        if (this.email && !this.validateEmail()) {
            throw new Error('Invalid email format');
        }
    }

    validateEmail() {
        if (!this.email) return true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }
}

module.exports = User;