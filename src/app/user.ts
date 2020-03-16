export class User {
    constructor(
        public firstname: string,
        public lastname: string,
        public email: string,
        public phone: string,
        public birthday: string,
        public password: string,
        public rePassword: string,
    ) { }
}