const { Command } = require("commander");

const contacts = require("./contacts")

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
      case "list":
        const contactsList = await contacts.listContacts();
        console.log(contactsList)
        break;
  
      case "get":
        const contact = await contacts.getContactById(id);
        console.log(contact)
        break;
  
      case "add":
        const newContact = await contacts.addContact({name, email, phone});
        console.log(newContact);
        break;
  
      case "remove":
        const trash = await contacts.removeContact(id);
        console.log(trash);
        break;
  
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  }

invokeAction(argv);
