const mongoose = require('mongoose');
const { cities } = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpCampDb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("Error, MONGO CONNECTION!!!!")
        console.log(err)
    })

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1001);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: '62587d74cdb7230ff3ac712d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam ex reprehenderit perferendis, excepturi, quibusdam neque quas sequi itaque accusantium voluptatibus officiis! Nesciunt ullam error asperiores alias repudiandae suscipit, molestiae mollitia?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
            ] 
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dd9vn0rwr/image/upload/v1651003555/YelpCamp/veaf2tiyyec4okgilrbx.jpg',
                    filename: 'YelpCamp/veaf2tiyyec4okgilrbx',
                },
                {
                    url: 'https://res.cloudinary.com/dd9vn0rwr/image/upload/v1651003560/YelpCamp/zaoispfeye0i6rwn9n9x.jpg',
                    filename: 'YelpCamp/zaoispfeye0i6rwn9n9x',
                },
                {
                    url: 'https://res.cloudinary.com/dd9vn0rwr/image/upload/v1651003561/YelpCamp/lfgwl4cn2jheyx9cp4vp.jpg',
                    filename: 'YelpCamp/lfgwl4cn2jheyx9cp4vp',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})