import React, { useState, useReducer, useMemo } from 'react';
import styles from './App.module.css';
import shortId from 'shortid';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import allContacts from './contacts.json';

const contactsReduser = (state, action) => {
  switch (action.type) {
    case 'addContact':
      return [...state, action.payload.contact];
    case 'removeContact':
      return state.filter(contact => contact.id !== action.payload.contactId);
    default:
      return state;
  }
};

export default function App() {
  const [name, setName] = useState('');
  const changeName = e => {
    setName(e.target.value);
  };
  const [number, setNumber] = useState('');
  const changeNumber = e => {
    setNumber(e.target.value);
  };

  const [contacts, dispatch] = useReducer(contactsReduser, allContacts);

  const addContacts = (name, number) => {
    const contact = {
      id: shortId.generate(),
      name: name,
      number: number,
    };
    dispatch({ type: 'addContact', payload: { contact } });
  };

  const removeContact = contactId => {
    dispatch({ type: 'removeContact', payload: { contactId } });
  };

  const [filter, setFilter] = useState('');
  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const filtredContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  });

  return (
    <div className={styles.App}>
      <h1 className={styles.AppText}>Phonebook</h1>
      <form className={styles.Form} onSubmit={addContacts}>
        <label className={styles.Label}>
          <span className={styles.Label__text}>Name</span>
          <input
            className={styles.Input}
            type="text"
            placeholder="Enter name (min 3 symb) "
            value={name}
            name="name"
            onChange={changeName}
            pattern="[A-Za-z]{3,}"
          />
          <input
            className={styles.Input}
            type="number"
            placeholder="Enter number"
            name="number"
            value={number}
            onChange={changeNumber}
          />
        </label>

        <button className={styles.Button} type="submit">
          Add contact
        </button>
      </form>

      <h2 className={styles.AppText}>Contacts</h2>
      <section>
        <input
          className={styles.Input}
          type="text"
          name="filter"
          value={filter}
          onChange={changeFilter}
        />
      </section>

      <ul>
        {filtredContacts.map(contact => (
          <li key={contact.id} className={styles.ContactListItem}>
            <p className={styles.name}>
              {contact.name}: {contact.number}
            </p>
            <button
              className={styles.Button}
              onClick={() => removeContact(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <NotificationContainer />
    </div>
  );
}
