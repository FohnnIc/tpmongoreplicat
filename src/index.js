import { MongoClient } from 'mongodb';
import {faker} from '@faker-js/faker';
import { createUsers, createOneUser, findOneUser, updateUser, deleteUser, findPeopleOver30, add5yearsAll } from './user.js';

const dataTest = { // données test pour tester le CRUD
    "name": "Bastien",
    "age": 31,
    "email": "bastien@domaine.com",
    "createdAt": "2023-01-01T00:00:00Z"
};
const objectIdTest = "661fcb29a71ae31d2ff7e75a"; // objectID présent dans mongo (en prendre un dans mongo pour tester)

const client = new MongoClient('mongodb://127.0.0.1:27017,127.0.0.1:27018,127.0.0.1:27019/?replicaSet=rs0'); //connection à la db et cest isntance

async function progPrincipale(){ //main qui execute le tout
    try {
        await client.connect(); //connexion aux client
        const db = client.db("test"); // association du client à la db test
        const collection = db.collection("users");// association de la db au document "users" (le créer si existe pas)
        console.log("Connecté");
       
        const users = [];
        for (let i = 0; i < 10; i++) {
            users.push({
                name: faker.internet.userName(),
                email: faker.internet.email(),
                age: faker.number.int({ min: 6, max: 100 }),
                createdAt: faker.date.past(),
              });
        } //fausse donnée bouclé (créer 10 faux utilisateurs)

        //utiliser la collection paramétré plus haut pour les fonctions
        await createUsers(users,collection); //utilisation de la fonction ajout d'utilisateurs
        await createOneUser(dataTest, collection);//utilisation de la fonction ajout d'un utilisateur
        await updateUser(objectIdTest,dataTest,collection);//utilisation de la fonction de modification d'un utilisateur en focntion de l'objectId et de nouvelles données
        await findOneUser(objectIdTest,collection);//utilisation de la fonction de recherche d'un utlisateur en fonction de l'objectId
        await deleteUser(objectIdTest,collection);//utilisation de la fonction de supprésion d'un utilisateur en fonction de l'objectId
        await findPeopleOver30(collection);
        await add5yearsAll(collection);
    } catch(error) {
        console.log(error); // catch en cas d'erreur
    } finally {
        client.close(); // fermer la connexion au client
        console.log("Connexion fermé")
    }
}

progPrincipale();// executé le main
