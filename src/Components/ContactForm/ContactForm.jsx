import React, { Component } from 'react';
import styles from './ContactForm.module.css';
import { NotificationManager } from 'react-notifications';
import T from 'prop-types';

export default class ContactForm extends Component {
  static propTypes = {
    onSubmit: T.func,
  };

  state = {
    name: '',
    number: '',
  };
  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.name) {
      NotificationManager.error('Введите имя', 'Ошибка', 5000);

      return;
    }

    this.props.onSubmit(this.state.name, this.state.number);
    this.setState({ number: '', name: '' });
  };
  render() {
    console.log(this.state.name);
    return (
      <form className={styles.Form} onSubmit={this.handleSubmit}>
        <label className={styles.Label}>
          <span className={styles.Label__text}>Name</span>
          <input
            className={styles.Input}
            type="text"
            placeholder="Enter name (min 3 symb) "
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
            pattern="[A-Za-z]{3,}"
          />
          <input
            className={styles.Input}
            type="number"
            placeholder="Enter number"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
          />
        </label>

        <button className={styles.Button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
