import React from 'react';
import { lowerCase } from 'lodash';
import beep from './beep.jpg';
import './App.scss';

class NotAccessibleApp extends React.Component {
  constructor() {
    super();

    this.state = {
      form: {},
    };

    this.errors = React.createRef();
    this.success = React.createRef();
  }

  onChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (lowerCase(this.state.form.name) === 'beep') {
      this.setState({
        success: true,
        error: undefined,
      }, () => {
        this.success.current && this.success.current.focus();
      });
    } else {
      this.setState({
        success: false,
        error: 'Name is incorrect.',
      }, () => {
        this.errors.current && this.errors.current.focus();
      });
    }
  }

  render() {
    const { error, form, success } = this.state;

    return (
      <div className="content">
        <div className="heading" tabindex="0">Name that Cat</div>

        <img className="beep" src={beep} />

        {success ? (
          <div className="success">
            You did it! The cat is {form.title} {form.name}.
          </div>
        ) : (
          <div>
            <form autoComplete="off">
              {error && (
                <div className="errors">
                  <h2 className="error-heading">
                    Your information has errors
                  </h2>
                  <ul title="errors">
                    <li>{error}</li>
                  </ul>
                </div>
              )}

              <div className="row">
                <div className="row__input">
                  <div className="label">
                    Title
                  </div>
                  <select
                    name="title"
                    id="title"
                    onChange={this.onChange}
                  >
                    <option></option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Doctor">Doctor</option>
                  </select>
                </div>

                <div className={`row__input ${error && 'row__input--error'}`}>
                  <div className="label">
                    Name
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <a
                onClick={this.onSubmit}
                href="#"
                className="submit"
              >
                Meow
              </a>
            </form>

            <div className="hint">
              Hint: Name should rhyme with "creep".
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default NotAccessibleApp;
