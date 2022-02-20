const express = require('express');
const app = express();
app.use(express.json())
const halls = require('./hallbooking')
const PORT = 9000;
//import mongo package to make connection with DB and nodejs
const { MongoClient } = require('mongodb');
const dbName =

    //// Connection URL
    // const url = 'mongodb://localhost:27017';
    // const client = new MongoClient(url);


    // async function main() {
    //     // Use connect method to connect to the server
    //     await client.connect();
    //     console.log('Connected successfully to server');
    //     const db = client.db(dbName);
    //     const collection = db.collection('documents');

    //     // the following code examples can be pasted here...

    //     return 'done.';
    // }

    //root endpoint
    app.get('/', (req, res) => {
        res.send('Hello Welcome to Hall Booking!!!')
    });

//get all halls
app.get('/halls', (req, res) => {
    const name = halls.map((x) => x)
    res.send(name)
});

//get only booked halls
app.get('/hallsbooked', (req, res) => {
    const name = halls.filter((x) => x.booked === true)
    res.send(name)
});




//get halls available for booking
app.get('/hallsavailable', (req, res) => {

    const name = halls.filter((x) => x.customerDetail.booked === false)
    res.send(name)
});


//create and book hall and show error if booked on same time and date

app.post('/bookhall', (req, res) => {
    //req.body comming from client
    halls.forEach((slot) => {
        console.log(slot.customerDetail.startTime);

        // if hall is already booked show error
        if (req.body.customerDetail.booked === false) {
            halls.push({
                id: req.body.id,
                name: req.body.name,
                seats: req.body.seats,
                amenities: req.body.amenities,
                price: req.body.price,
                customerDetail: {
                    customerName: req.body.customerDetail.customerName,
                    date: req.body.customerDetail.date,
                    startTime: req.body.customerDetail.startTime,
                    endTime: req.body.customerDetail.endTime,
                    booked: req.body.customerDetail.booked
                }

            })
            res.send("hall successfully booked!!!")
        }

        else {
            res.send("Sorry Hall already booked!!!")
        }
    })

});










app.listen(PORT, () => console.log('listening on port ' + PORT))