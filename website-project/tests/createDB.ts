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

var ShortSleeveTShirts = []
var LongSleeveTShirts = []
var TankTops = []
var Shirts = []

var Shorts = []
var Jeans = []
var Kakis = []
var Joggers = []

var AnkleSocks = []
var CrewSocks = []

var Belts = []
var Wallets = []
var FaceMasks = []
var Hats = []

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
                for (let k = 0; k < ShortSleeveTShirts.length; k++) {
                    let Item = {
                        id : i.toString() + ' - ' + j.toString() + ' - ' + k.toString(),
                        name : ShortSleeveTShirts[k],
                        price : Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                        description : 'demo description',
                        stock : Math.floor(Math.random() * (500 - 0 + 1) + 0),
                        postedTime : '01/01/2020',
                        category: Category
                    }
                    let Itemdata = JSON.stringify(Item)
                    fs.appendFile('Item.json', Itemdata)
                }
            }
            if (j == 1) {
                for (let k = 0; k < LongSleeveTShirts.length; k++) {
                    let Item = {
                        id : i.toString() + ' - ' + j.toString() + ' - ' + k.toString(),
                        name : LongSleeveTShirts[k],
                        price : Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                        description : 'demo description',
                        stock : Math.floor(Math.random() * (500 - 0 + 1) + 0),
                        postedTime : '01/01/2020',
                        category: Category
                    }
                    let Itemdata = JSON.stringify(Item)
                    fs.appendFile('Item.json', Itemdata)
                }
            }
            if (j == 2) {
                for (let k = 0; k < TankTops.length; k++) {
                    let Item = {
                        id : i.toString() + ' - ' + j.toString() + ' - ' + k.toString(),
                        name : TankTops[k],
                        price : Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                        description : 'demo description',
                        stock : Math.floor(Math.random() * (500 - 0 + 1) + 0),
                        postedTime : '01/01/2020',
                        category: Category
                    }
                    let Itemdata = JSON.stringify(Item)
                    fs.appendFile('Item.json', Itemdata)
                }
            }
            if (j == 3) {
                for (let k = 0; k < Shirts.length; k++) {
                    let Item = {
                        id : i.toString() + ' - ' + j.toString() + ' - ' + k.toString(),
                        name : Shirts[k],
                        price : Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                        description : 'demo description',
                        stock : Math.floor(Math.random() * (500 - 0 + 1) + 0),
                        postedTime : '01/01/2020',
                        category: Category
                    }
                    let Itemdata = JSON.stringify(Item)
                    fs.appendFile('Item.json', Itemdata)
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

            if (j == 0) {
                for (let k = 0; k < Shorts.length; k++) {
                    let Item = {
                        id : i.toString() + ' - ' + j.toString() + ' - ' + k.toString(),
                        name : Shorts[k],
                        price : Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                        description : 'demo description',
                        stock : Math.floor(Math.random() * (500 - 0 + 1) + 0),
                        postedTime : '01/01/2020',
                        category: Category
                    }
                    let Itemdata = JSON.stringify(Item)
                    fs.appendFile('Item.json', Itemdata)
                }
            }
            if (j == 1) {
                for (let k = 0; k < Jeans.length; k++) {
                    let Item = {
                        id : i.toString() + ' - ' + j.toString() + ' - ' + k.toString(),
                        name : Jeans[k],
                        price : Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                        description : 'demo description',
                        stock : Math.floor(Math.random() * (500 - 0 + 1) + 0),
                        postedTime : '01/01/2020',
                        category: Category
                    }
                    let Itemdata = JSON.stringify(Item)
                    fs.appendFile('Item.json', Itemdata)
                }
            }
            if (j == 2) {
                for (let k = 0; k < Kakis.length; k++) {
                    let Item = {
                        id : i.toString() + ' - ' + j.toString() + ' - ' + k.toString(),
                        name : Kakis[k],
                        price : Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                        description : 'demo description',
                        stock : Math.floor(Math.random() * (500 - 0 + 1) + 0),
                        postedTime : '01/01/2020',
                        category: Category
                    }
                    let Itemdata = JSON.stringify(Item)
                    fs.appendFile('Item.json', Itemdata)
                }
            }
            if (j == 3) {
                for (let k = 0; k < Joggers.length; k++) {
                    let Item = {
                        id : i.toString() + ' - ' + j.toString() + ' - ' + k.toString(),
                        name : Joggers[k],
                        price : Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                        description : 'demo description',
                        stock : Math.floor(Math.random() * (500 - 0 + 1) + 0),
                        postedTime : '01/01/2020',
                        category: Category
                    }
                    let Itemdata = JSON.stringify(Item)
                    fs.appendFile('Item.json', Itemdata)
                }
            }
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

            if (j == 0) {
                for (let k = 0; k < AnkleSocks.length; k++) {
                    let Item = {
                        id : i.toString() + ' - ' + j.toString() + ' - ' + k.toString(),
                        name : AnkleSocks[k],
                        price : Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                        description : 'demo description',
                        stock : Math.floor(Math.random() * (500 - 0 + 1) + 0),
                        postedTime : '01/01/2020',
                        category: Category
                    }
                    let Itemdata = JSON.stringify(Item)
                    fs.appendFile('Item.json', Itemdata)
                }
            }
            if (j == 0) {
                for (let k = 0; k < CrewSocks.length; k++) {
                    let Item = {
                        id : i.toString() + ' - ' + j.toString() + ' - ' + k.toString(),
                        name : CrewSocks[k],
                        price : Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                        description : 'demo description',
                        stock : Math.floor(Math.random() * (500 - 0 + 1) + 0),
                        postedTime : '01/01/2020',
                        category: Category
                    }
                    let Itemdata = JSON.stringify(Item)
                    fs.appendFile('Item.json', Itemdata)
                }
            }
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

            if (j == 0) {
                for (let k = 0; k < Belts.length; k++) {
                    let Item = {
                        id : i.toString() + ' - ' + j.toString() + ' - ' + k.toString(),
                        name : Belts[k],
                        price : Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                        description : 'demo description',
                        stock : Math.floor(Math.random() * (500 - 0 + 1) + 0),
                        postedTime : '01/01/2020',
                        category: Category
                    }
                    let Itemdata = JSON.stringify(Item)
                    fs.appendFile('Item.json', Itemdata)
                }
            }
            if (j == 1) {
                for (let k = 0; k < Wallets.length; k++) {
                    let Item = {
                        id : i.toString() + ' - ' + j.toString() + ' - ' + k.toString(),
                        name : Wallets[k],
                        price : Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                        description : 'demo description',
                        stock : Math.floor(Math.random() * (500 - 0 + 1) + 0),
                        postedTime : '01/01/2020',
                        category: Category
                    }
                    let Itemdata = JSON.stringify(Item)
                    fs.appendFile('Item.json', Itemdata)
                }
            }
            if (j == 2) {
                for (let k = 0; k < FaceMasks.length; k++) {
                    let Item = {
                        id : i.toString() + ' - ' + j.toString() + ' - ' + k.toString(),
                        name : FaceMasks[k],
                        price : Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                        description : 'demo description',
                        stock : Math.floor(Math.random() * (500 - 0 + 1) + 0),
                        postedTime : '01/01/2020',
                        category: Category
                    }
                    let Itemdata = JSON.stringify(Item)
                    fs.appendFile('Item.json', Itemdata)
                }
            }
            if (j == 3) {
                for (let k = 0; k < Hats.length; k++) {
                    let Item = {
                        id : i.toString() + ' - ' + j.toString() + ' - ' + k.toString(),
                        name : Hats[k],
                        price : Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                        description : 'demo description',
                        stock : Math.floor(Math.random() * (500 - 0 + 1) + 0),
                        postedTime : '01/01/2020',
                        category: Category
                    }
                    let Itemdata = JSON.stringify(Item)
                    fs.appendFile('Item.json', Itemdata)
                }
            }
        }
    }
}

