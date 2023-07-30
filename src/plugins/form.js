import axios from "@/plugins/axios";

class Errors {
    constructor() {
        this.errors = {}
    }

    has(field){
        return this.errors.hasOwnProperty(field)
    }

    get(field){
        if (this.errors[field]){
            return this.errors[field][0]
        }
    }

    record(errors){
        this.errors = errors
    }

    clear(field){
        if(field) {
            delete this.errors[field]
        }else {
            this.errors = {}
        }
    }

    any(){
        return Object.keys(this.errors).length > 0
    }
}

class Form {
    constructor(data) {
        this.originalData = data

        for (let field in data) {
            this[field] = data[field]
        }

        this.errors = new Errors()
    }

    data(){
        let data = Object.assign({} , this)

        delete data.originalData
        delete data.errors

        return data
    }

    reset(){
        for (let field in this.originalData){
            this[field] = ''
        }

        this.errors.clear()
    }

    submit(requestType , url){

        return new Promise((resolve , reject) => {
            axios[requestType](url , this.data())
                .then(response => {
                    this.onSuccess(response.data)
                    resolve(response.data)
                })
                .catch(error => {
                    this.onFail(error.response.data.errors)
                    reject(error.response.data.errors)
                })
        })
    }

    onSuccess(){
        this.reset()
    }

    onFail(errors){
        this.errors.record(errors)
    }
}

export default Form
