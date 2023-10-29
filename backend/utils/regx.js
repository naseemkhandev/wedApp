module.exports = {
    ValidDate: /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/,
    ValidUsernameChar: "^([a-z])\\1{2}",
    ValidUsername: "^[a-z]+([a-z0-9.])*$",
    specialCharecters: "[`~!#$%^&*(),?\":{}|<>/\\=']",
    OnlyMobile: "^(9|8|7|6)[0-9]+$",
    ValidInteger: "^[0-9]*$",
};
