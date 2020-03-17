export class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: string,
        public birthday: string,
        public password: string,
        public rePassword: string,
    ) { }
}