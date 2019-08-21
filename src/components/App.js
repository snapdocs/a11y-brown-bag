import React from 'react';
import { lowerCase } from 'lodash';
import beep from './beep.jpg';
import './App.scss';

class App extends React.Component {
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
        <h1 className="heading" tabindex="0">Name that Cat</h1>

        <img className="beep" src={beep} alt="The fluffly gray cat says, 'I’m Leslie’s cat'." />

        {success ? (
          <div className="success" tabIndex="-1" ref={this.success}>
            You did it! The cat is {form.title} {form.name}.
          </div>
        ) : (
          <div>
            <form autoComplete="off" onSubmit={this.onSubmit}>
              {error && (
                <div className="errors">
                  <h2
                    className="error-heading"
                    id="error-summary"
                    tabIndex="-1"
                    ref={this.errors}
                  >
                    Your information has errors
                  </h2>
                  <ul aria-labelledby="error-summary">
                    <li id="name-error"><a href="#name">{error}</a></li>
                  </ul>
                </div>
              )}

              <div className="row">
                <div className="row__input">
                  <label htmlFor="title">
                    Title
                  </label>
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
                  <label htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    aria-invalid={!!error}
                    aria-required="true"
                    aria-describedby="name-hint name-error"
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <button
                className="submit"
                type="submit"
                aria-label="Submit"
              >
                <div aria-hidden="true">Meow</div>
              </button>
            </form>

            <div className="hint" id="name-hint">
              Hint: Name should rhyme with "creep".
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
