const fs = require("fs").promises;
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");


const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    return result ?? null;
  }
  
const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);

    return result ?? null;
  }
  
const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId); 
    const index = contacts.indexOf(result);
    if ( index >= 0 ) {
      contacts.splice(index, 1);
      const parsedNewContactsList = JSON.stringify(contacts, null, 2);
      await fs.writeFile(contactsPath, parsedNewContactsList);
      return result;
    } 
    return null;
  }
  
const addContact = async({name, email, phone}) => {
    const contacts = await listContacts();
    const newContact = { 
        id: nanoid(),
        name, 
        email,
        phone,
    };
    contacts.push(newContact);
    const parsedNewContactsList = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, parsedNewContactsList);
    return newContact ?? null;
  }


  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  }
