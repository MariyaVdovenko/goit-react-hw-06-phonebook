import React, { Component } from 'react';
import styles from './Filter.module.css';
import T from 'prop-types';

export default class Filter extends Component {
  static propTypes = {
    handleChange: T.func,
  };
  render() {
    return (
      <section>
        <input
          className={styles.Input}
          type="text"
          name="filter"
          value={this.props.filter}
          onChange={this.props.handleChange}
        />
      </section>
    );
  }
}
