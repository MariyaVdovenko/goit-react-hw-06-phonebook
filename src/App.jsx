import React, { useState, useReducer, useMemo, useEffect } from 'react';
import styles from './App.module.css';
import shortId from 'shortid';
import 'react-notifications/lib/notifications.css';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import allContacts from './contacts.json';
import * as storage from './localStorage';

const contactsReducer = (state, action) => {
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
  //name & number
  const [name, setName] = useState('');
  const changeName = e => {
    setName(e.target.value);
  };
  const [number, setNumber] = useState('');
  const changeNumber = e => {
    setNumber(e.target.value);
  };

  //contacts

  const [contacts, dispatch] = useReducer(
    contactsReducer,
    storage.getLocalStorage('contacts') || allContacts,
  );
  useEffect(() => {
    storage.saveToLocalStorage('contacts', contacts);
  }, [contacts]);

  const addContacts = e => {
    e.preventDefault();

    const contact = {
      id: shortId.generate(),
      name,
      number,
    };
    const filr = contacts.find(contact => {
      return contact.name.toLowerCase() === name.toLowerCase();
    });

    if (filr !== undefined) {
      NotificationManager.warning(
        `${name} already exist`,
        'Try another name',
        3000,
      );
      return;
    }
    if (!name) {
      NotificationManager.warning(
        `Enter contact name`,

        3000,
      );
      return;
    }
    dispatch({ type: 'addContact', payload: { contact } });
    setName('');
    setNumber('');
  };

  const removeContact = contactId => {
    dispatch({ type: 'removeContact', payload: { contactId } });
  };

  //filter
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
        {filtredContacts &&
          filtredContacts.map(contact => (
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
