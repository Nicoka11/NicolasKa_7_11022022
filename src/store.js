export default class Store {
    constructor() {
        this.state = {
            search: "",
        }
    }

    set search(newSearch) {
        this.state.search = newSearch;
    }
    get search() {
        return this.state.search;
    }
} 
