export default class TestUser {
    #email;
    #name;
    
    constructor(email, name) {
        this.#email = email;
        this.#name = name;
    }
    
    get email() {
        return this.#email;
    }
    
    get name() {
        return this.#name;
    }
}
