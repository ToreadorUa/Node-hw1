const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

// console.log(getContactById("1DEXoP8AuCGYc1YgoQ6hw"));
// getContactById("1DEXoP8AuCGYc1YgoQ6hw")
// removeContact("qdggE76Jtbfd9eWJHrssH")

async function listContacts() {
  // return array of contacts
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((el) => el.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const delItem = contacts.find((el) => el.id === contactId) || null;
  const newArr = contacts.filter((el) => el.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newArr, null, 2));
  return delItem
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  fs.writeFile(contactsPath,JSON.stringify(contacts,null,2))
  return newContact;
}

module.exports = { listContacts, getContactById, addContact, removeContact };
