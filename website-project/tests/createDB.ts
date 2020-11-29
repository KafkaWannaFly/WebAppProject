var usernames = ['abc', 'def', 'ghi', 'jkl', 'mno']
var names = ['John', 'James', 'Jack', 'Rose', 'Mia']

declare function require(name:string)
var fs = require('fs')

for (let i = 0; i < usernames.length; i++) {
    let User = {
        username : usernames[i],
        password : '0123456789',
        email : usernames[i] + '@demomail.com',
        name : names[i],
        DoB : '01/01/2000',
        gender : '',
        address : 'demo address',
        phone: '0123456789',
        height : 1.7,
        weight : 50,
        UserType: 'normal'
    }
    if (User.name == 'John' || User.name == 'James' || User.name == 'Jack') {
        User.gender = 'male'
        let Userdata = JSON.stringify(User)
        fs.appendFile('User.json', Userdata)
    }
    else {
        User.gender = 'female'
        let Userdata = JSON.stringify(User)
        fs.appendFile('User.json', Userdata)
    }    
}

let Admin = {
    username : 'admin',
    password : '0123456789',
    email : 'admin@demomail.com',
    name : 'Admin',
    DoB : '01/01/2000',
    gender : '',
    address : 'demo address',
    phone: '0123456789',
    height : 1.7,
    weight : 50,
    UserType: 'shopEmployee'
}
let Admindata = JSON.stringify('Admin')
fs.appendFile('User.json', Admindata)

var catergoryNames = ['Shirt', 'Pant', 'Sock', 'Accessory']
var ShirtCategory = ['Short sleeve T-shirt', 'Long sleeve T-shirt', 'Tank top', 'Shirt']
var PantCategory = ['Short', 'Jean', 'Kaki', 'Jogger']
var SockCategory = ['Ankle sock', 'Crew sock']
var AccessoryCategory = ['Belt', 'Wallet', 'Face mask', 'Hat']

var ShortSleeveShirt = 'Round neck T-shirt Cotton Compact Premium printed'
var ShortSleeveShirtTypes = ['Christmas - Moss green', 'Words in Christmas style - Velvet', 'White bear - Moss green', 'Im Single - Black', 'Happy Man - Black', '#MienTrung - Black', 'Coolmate - White' , 'Coolmate - Black']

for (let i = 0; i < catergoryNames.length; i++) {
    if (i == 0) {
        for (let j = 0; j < ShirtCategory.length; j++) {
            let Category = {
                name : catergoryNames[i],
                detailName : ShirtCategory[i]
            }
            let Categorydata = JSON.stringify(Category)
            fs.appendFile('Category.json', Categorydata)
            if (j == 0) {
                for (let z = 0; z < ShortSleeveShirtTypes.length; z++) {
                    let Item = {
                        
                    }
                }
            }
        }
    }
    if (i == 1) {
        for (let j = 0; j < PantCategory.length; j++) {
            let Category = {
                name : catergoryNames[i],
                detailName : PantCategory[i]
            }
            let Categorydata = JSON.stringify(Category)
            fs.appendFile('Category.json', Categorydata)
        }
    }
    if (i == 2) {
        for (let j = 0; j < SockCategory.length; j++) {
            let Category = {
                name : catergoryNames[i],
                detailName : SockCategory[i]
            }
            let Categorydata = JSON.stringify(Category)
            fs.appendFile('Category.json', Categorydata)
        }
    }
    if (i == 3) {
        for (let j = 0; j < AccessoryCategory.length; j++) {
            let Category = {
                name : catergoryNames[i],
                detailName : AccessoryCategory[i]
            }
            let Categorydata = JSON.stringify(Category)
            fs.appendFile('Category.json', Categorydata)
        }
    }
}

