export const patterns: {[key: string]: string} = {
    name: '[a-zA-Z]*',
    phone: '[0-9]*',
    password: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].*'
};
