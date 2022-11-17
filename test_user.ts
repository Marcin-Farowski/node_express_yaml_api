export default class TestUser {
    #email;
    #name;
    
    constructor(email: string, name: string) {
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
