import { useState, useEffect } from 'react';

import { nanoid } from 'nanoid';

import { Form } from 'components/Form/Form';
import { Section } from 'components/Section/Section';

import { Contacts } from 'components/Contacts/Contacts';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storageData = localStorage.getItem('contacts');

    if (storageData === null) {
      return;
    }

    setContacts(JSON.parse(storageData));
  }, []);

  useEffect(() => {
    if (!JSON.stringify(contacts)) {
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    if (
      contacts.some(
        el => el.name.toLowerCase().trim() === name.toLowerCase().trim()
      )
    ) {
      alert('Такой контакт уже существует');
      return;
    }

    setContacts(prevContacts => [
      ...prevContacts,
      {
        name,
        number,
        id: nanoid(),
      },
    ]);
  };

  const deleteContact = id => {
    setContacts(prevContacts => [
      ...prevContacts.filter(contact => contact.id !== id),
    ]);
  };

  const handleStringChange = event => {
    setFilter(event.currentTarget.value);
  };

  const filteredContacts = data => {
    return data.filter(contact => {
      return contact.name
        .toLowerCase()
        .trim()
        .includes(filter.toLowerCase().trim());
    });
  };

  return (
    <>
      <Section title="Phonebook">
        <Form addContact={addContact} />
      </Section>
      <p>Find contacts by name</p>
      <input type="text" onChange={handleStringChange} value={filter} />
      <Section title="Contacts">
        <Contacts
          data={filteredContacts(contacts)}
          deleteContact={deleteContact}
        />
      </Section>
    </>
  );
}
