const { program } = require("commander");
const contacts = require("./contacts.js");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "read":
      const contactsList = await contacts.listContacts();
      return console.table(contactsList);
    case "remove":
      const deletedContact = await contacts.removeContact(id);
      return console.log(deletedContact);
    case "add":
      const addedContact = await contacts.addContact(name, email, phone);
      return console.log(addedContact); 
    case "get":
      const findedContact = await contacts.getContactById(id);
      return console.log(findedContact);;
    default:
      return console.log("Unknown operation");
  }
};

program
    .option("-a, --action, <type>")
    .option("-i, --id, <type>")
    .option("-n, --name, <type>")
    .option("-e, --email, <type>")
    .option("-p, --phone, <type>")

program.parse();
const options = program.opts()

invokeAction(options);
