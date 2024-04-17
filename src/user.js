import { ObjectId } from 'mongodb';

export async function createUsers(data, collection){
  try{
    await collection.insertMany(data);  // insert d'un ou plusieurs uti en fonction de l'objet
  console.log("Création d'utilisateur(s) OK");
  }catch{
    console.log("Erreur lors de la création d'utilisateur");
  }
}

export async function createOneUser(data, collection){
  try{
    collection.insertOne(data); // créé un uti en fonction d'un objet en param
  console.log("Création d'utilisateur OK");
  }catch{
    console.log("Erreur lors de la création d'utilisateur");
  }
}

export async function updateUser(objectId, updatedData, collection) {
  try {
      const filter = { _id: new ObjectId(objectId) };
      const { _id, ...updateFields } = updatedData; 
      await collection.updateOne(filter, { $set: updateFields });//met à jour un uti  en fonction du filtre dans ce cas l'objectID et set les nouvelles data passé en param
      console.log("Mise à jour d'utilisateur OK");
  } catch(error) {
      console.log("Erreur lors de la mise à jour d'utilisateur :", error);
  }
}

export async function findOneUser(objectId,collection){
  try{
    await collection.findOne({ _id: objectId });// trouver un uti en fonction de son objectId
    console.log("Recherde de l'utilisateur OK");
  }catch{
    console.log("Erreur lors de la recherche de l'utilisateur");
  }
}

export async function deleteUser(objectId,collection){
  try{
    await collection.deleteOne({ _id: objectId });// supp un uti en fonction de l'objectId 
    console.log("Supprésion de l'utilisateur OK");
  } catch{
    console.log("Erreur lors de la suppréssion d'utilisateur");
  }
}
export async function findPeopleOver30(collection){// trouve les uti de plus de 30ans
  try{
    const res = await collection.find({ "age": { $gt: 30 } }).toArray();
    console.log("Les gens de plus de 30 ans sont : ", res);
  } catch{
    console.log("Erreur lors de la recherche");
  }
}
export async function add5yearsAll(collection){// ajoute 5 ans à tout les uti
  try{
    await collection.updateMany( {},
      { $inc: {"age": 5} });
      console.log("les gens ont bien vieilli");
  }catch{
    console.log("les gens non pas vieilli");
  }
  
}