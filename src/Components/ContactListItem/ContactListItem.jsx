import React from 'react';
import styles from './ContactListItem.module.css';
import T from 'prop-types';

const ContactListItem = ({ contact, onDeleteContact }) => {
  const { name, number, id } = contact;

  return (
    <li className={styles.ContactListItem}>
      <p className={styles.name}>
        {name}: {number}
      </p>
      <button className={styles.Button} onClick={() => onDeleteContact(id)}>
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  contact: T.shape({
    name: T.string,
    number: T.string,
  }),
};

export default ContactListItem;
