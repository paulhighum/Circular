import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import scriptLoader from 'react-async-script-loader';
import styled from 'styled-components';

import colors from './Styled/colors';

import hexToRGB from './Styled/utils';

import {
  searchAddressFlow,
  clearSearchResults
} from '../redux/actions/initialSearch';

const AutosuggestInputForm = styled.div`
  width: 100%;
  height: 100%;
  opacity: 1;

  .search_input,
  .search_input:focus,
  .search_input:active {
    width: 100%;
    margin: 16px;
    margin-right: 0;
    color: ${colors.secondaryColor};
    padding: 0;
    background-color: #FAFAFA;
    display: inline-block;
    font-size: 16px;
    border: none;
    outline: none;
  }

  .input_form,
  .input_form:focus,
  .input_form:active {
    position: relative;
    height: 52px;
    background-color: #FAFAFA;
    box-shadow: 0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24);
    padding: 0;
    font-size: 16px;
    border: none;
    border-radius: 2px;
    border-bottom: 1px solid transparent;
    outline: none;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    border-bottom: honeydew;
    border-left: honeydew;
    border-right: honeydew;
    border-radius: 2px;
    max-width: 530px;
    margin: auto;
  }

  .autocomplete_container {
    width: calc(100% + 52px);
    border-bottom: honeydew;
    border-left: honeydew;
    border-right: honeydew;
    border-top: 1px solid #e6e6e6;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    border-radius: 0 0 2px 2px;
  }

  .form_group {
    width: calc(100% - 104px);
  }

  .input_suggestion_item {
    padding: 4px;
    text-align: left;
  }

  .suggestion_text_bold {
    font-weight: 600;
    color: $secondary-color;
  }

  .search_button {
    border: none;
    position: absolute;
    border-radius: 0 2px 2px 0;
    right: 0;
    background-color: ${hexToRGB(colors.secondaryColor, 0.85)};
    height: 52px;
    width: 52px;
    display: inline-block;
    color: $mainwhite;

    &:hover:not(:disabled),
    &:focus {
      cursor: pointer;
      background-color: ${colors.secondaryColor};
      z-index: 100;
    }

    &:disabled {
      opacity: 0.75;
    }

  }

  .fa-map-marker {
    color: ${colors.secondaryColor};
  }

  .clear_button {
    border: none;
    padding: 0;
    color: ${colors.secondaryColor};
    position: absolute;
    align-self: center;
    right: 52px;
    margin: 0 2px 2px 0;
    background-color: #FAFAFA;
    height: 41px;
    width: 41px;
    display: inline-block;

      &:hover {
      cursor: pointer;
    }

    &:focus {
      z-index: 100;
    }
  }

  .suggestion_text_muted {
    font-weight: lighter;
    font-size: 0.75em;
    color: ${hexToRGB(colors.secondaryColor, 0.85)};
  }
`;

class AutoSuggestInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      isFieldActive: false
    };
    this.onChange = address => this.setState({ address });
  }

  handleSelect(address) {
    this.props.searchAddressFlow(address, geocodeByAddress, getLatLng);
  }

  handleSearchClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this.handleSelect(this.state.address);
    this.addressInput.focus();
  }

  clearInput(e) {
    e.preventDefault();
    this.setState({ address: '' });
    this.props.clearSearchResults();
    this.addressInput.focus();
  }

  render() {
    const cssClasses = {
      root: 'form_group',
      input: 'search_input',
      autocompleteContainer: 'autocomplete_container'
    };

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="input_suggestion_item">
        <i className="fa fa-map-marker" />
        <strong className="suggestion_text_bold">{formattedSuggestion.mainText}</strong>{' '}
        <small className="suggestion_text_muted">{formattedSuggestion.secondaryText}</small>
      </div>);

    const inputProps = {
      ref: (input) => { this.addressInput = input; },
      type: 'text',
      value: this.state.address,
      onChange: this.onChange,
      autoFocus: true,
      placeholder: 'Search your address'
    };

    return (
      <AutosuggestInputForm>
        <div className="input_form">
          { this.props.isScriptLoaded ?
            <PlacesAutocomplete
              autocompleteItem={AutocompleteItem}
              classNames={cssClasses}
              inputProps={inputProps}
              onSelect={address => this.handleSelect(address)}
              onEnterKeyDown={address => this.handleSelect(address)}
              clearItemsOnError
            />
          : <input type="text" /> }
          { this.state.address &&
            <button
              className="clear_button"
              onClick={e => this.clearInput(e)}
            >
              <i className="fa fa-times fa-2x" aria-hidden="true" />
            </button>
          }
          <button
            className="search_button"
            disabled={!this.state.address}
            onClick={e => this.handleSearchClick(e)}
          >
            <i className="fa fa-search fa-2x" aria-hidden="true" />
          </button>
        </div>
      </AutosuggestInputForm>
    );
  }
}

AutoSuggestInput.propTypes = {
  searchAddressFlow: PropTypes.func.isRequired,
  clearSearchResults: PropTypes.func.isRequired,
  isScriptLoaded: PropTypes.bool.isRequired
};

export default connect(
  ({ initialSearch }) => ({ initialSearch }), {
    searchAddressFlow,
    clearSearchResults
  })(scriptLoader(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`)(AutoSuggestInput));
