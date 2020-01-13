import React, { Component } from 'react';
import styles from './App.module.css';
import ContactForm from './Components/ContactForm/ContactForm';

import ContactList from './Components/ContactList/ContactList';
import shortId from 'shortid';
import 'react-notifications/lib/notifications.css';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import allContacts from './contacts.json';
import T from 'prop-types';

//Телефонная книга
// Возьми свое решение задания из домашней работы 2 и добавь хранение контактов
// телефонной книги в localStorage. Используй методы жизненного цикла.

// При добавлении и удалении контакта, контакты сохраняются в локальное хранилище.
// При загрузке приложения, контакты, если таковые есть, считываются из локального
// хранилища и записываются в состояние.

export default class App extends Component {
  static propTypes = {
    allContacts: T.arrayOf(
      T.shape({
        id: T.string.isRequired,
        name: T.string,
        number: T.string,
      }),
    ),
  };

  state = {
    contacts: allContacts,
  };

  componentDidMount() {
    try {
      const contacts = localStorage.getItem('contacts');
      if (contacts) {
        const parsedContacts = JSON.parse(contacts);

        this.setState({ contacts: parsedContacts });
      }
    } catch (e) {}
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onSubmit = (name, number) => {
    const { contacts } = this.state;
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
    if (filr !== undefined) {
      NotificationManager.warning(
        `${name} already exist`,
        'Try another name',
        3000,
      );
      return;
    }

    this.saveContact(name, number);
  };

  saveContact(name, number) {
    const contact = {
      id: shortId.generate(),
      name: name,
      number: number,
    };

    this.addContact(contact);
  }

  addContact(contact) {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  }

  deleteContact = contactId => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts } = this.state;
    return (
      <div className={styles.App}>
        <h1 className={styles.AppText}>Phonebook</h1>
        <ContactForm onSubmit={this.onSubmit} />
        <h2 className={styles.AppText}>Contacts</h2>

        <ContactList contacts={contacts} onDeleteContact={this.deleteContact} />
        <NotificationContainer />
      </div>
    );
  }
}
