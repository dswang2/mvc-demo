class Model {
    constructor(options) {
        this.data = options.data;
        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                if (this[key]) {
                    this[key] = options[key];
                }
            }
        }
    }

    create() {
    }

    delete() {
    }

    update() {
    }

    get() {
    }
}

export default Model