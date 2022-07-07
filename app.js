// Objetivo: Hacer consultas a la base de datos de restaurantes de nuestra instancia de servidor MongoDB Atlas.

// 1. Instalar un paquete de terceros que se llama mongodb

// 2. Conectarnos a la BBDD
// 2.1 Conecction string
// 2.2 Utilizar el método adecuado que ofrece la biblioteca mongodb 

// PROHIBIDO COPIAR MI URI
const uri = "mongodb+srv://root:root@cluster0.lo8dg.mongodb.net/?retryWrites=true&w=majority";
const { MongoClient } = require('mongodb');
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function findRestaurants() {
    // Seleccionar la base de datos
    const database = client.db('sample_restaurants');

    // Seleccionamos la colección restaurants
    const restaurants = database.collection('restaurants');

    // Obtener todos los restaurantes
    const document = await restaurants.findOne({
        borough: "Bronx"
    });

    console.log(document)

    // Obtener varios documentos
    // Todos los restaurantes que son del Bronx y sirven comida American
    const americanRestaurants = await restaurants.find({
        borough: "Bronx",
        cuisine: "American"
    }).toArray();
    console.log(americanRestaurants.length);

}

async function insertRestaurant() {
    // Seleccionar la base de datos
    const database = client.db('sample_restaurants');

    // Seleccionamos la colección restaurants
    const restaurants = database.collection('restaurants');

    // Insertar nuevo restaurante
    const document = await restaurants.insertOne({
        "address": {
            "building": "707",
            "coord": [
                -73.9653967,
                40.6064339
            ],
            "street": "Kings Highway",
            "zipcode": "11223"
        },
        "borough": "Brooklyn",
        "cuisine": "Jewish/Kosher",
        "name": "The Happy Jew",
        "restaurant_id": "401234567"
    });

    console.log(document);
}

// Usamos el método connect del objecto client para conectarnos a la BBDD
client.connect(async () => {
    // Esta función se ejcuta un vez te has conectado a la base de datos
    console.log('Conectado a la base de datos correctamente.');
    await insertRestaurant();

    // cerrar la conexión
    await client.close();

});
