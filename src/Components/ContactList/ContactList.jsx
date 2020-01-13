import React, { Component } from 'react';
import ContactListItem from '../ContactListItem/ContactListItem';
import Filter from '../Filter/Filter';
import T from 'prop-types';

export default class ContactList extends Component {
  static propTypes = {
    onDeleteContact: T.func,
    contacts: T.arrayOf(
      T.shape({
        id: T.string.isRequired,
        name: T.string,
        number: T.string,
      }),
    ),
  };
  state = { filter: '' };
  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };
  render() {
    return (
      <>
        <Filter handleChange={this.handleChange} />
        <ul>
          {this.props.contacts
            .filter(contact => {
              return (
                contact.name
                  .toLowerCase()
                  .indexOf(this.state.filter.toLowerCase()) >= 0
              );
            })
            .map(contact => (
              <ContactListItem
                key={contact.id}
                onDeleteContact={this.props.onDeleteContact}
                contact={contact}
              />
            ))}
        </ul>
      </>
    );
  }
}
