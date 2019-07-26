// Core
import React, { Component } from 'react';

//Components
import CountriesList from '../components/Countries-list';

//Instruments
import countriesData from '../assets/data.js';
import './styles.css'; 

export default class PhoneInput extends Component {
    state = {
        cursor: -1,
        phoneFilter: '380',
        countryIso: 'ua',
        showCountryList: false
    }

    _updatePhoneFilter = ({ target: { value }}) => this.setState({
        phoneFilter: value,
    })

    _toggleCountryList = () => this.setState(({ showCountryList }) => {
        return {
            showCountryList: !showCountryList
        }
    })

    _hiddenCountryList = () => this.setState({
        showCountryList: false
    })

    _showCountryList = () => this.setState({
        showCountryList: true
    })

    _getCountry = (value, code) => this.setState({
        countryIso: value,
        phoneFilter: code
    })

    _handleKeyDown = (e) => {
        const upKey = e.key === 'ArrowUp';
        const downKey = e.key === 'ArrowDown'

        console.log('robe!');
        if(!upKey && !downKey) return;

        e.preventDefault();
        const { cursor } = this.state;
        const { allCountries } = countriesData;
        
        if (upKey && cursor > 0) {
            this.setState( prevState => ({
                cursor: prevState.cursor - 1,
                countryIso: allCountries[prevState.cursor - 1].iso2,
                phoneFilter: allCountries[prevState.cursor - 1].dialCode
            }))
        } else if (downKey && cursor < allCountries.length - 1) {
            this.setState( prevState => ({
                cursor: prevState.cursor + 1,
                countryIso: allCountries[prevState.cursor + 1].iso2,
                phoneFilter: allCountries[prevState.cursor + 1].dialCode
            }))
        }
    }

    render() {
        const { cursor, phoneFilter, countryIso, showCountryList } = this.state;
        const { allCountries } = countriesData;
        const btnActive = showCountryList ? 'btnActive' : '';

        return (
            <section>
                <div className = 'search'>
                    <button
                        type = 'button'
                        className={`flagSelect ${btnActive}`}
                        onClick = { this._toggleCountryList }
                    >
                        <div className = {`flag ${countryIso}`}></div>
                    </button>
                    <div className = 'prefix'>+</div>
                    <input
                        placeholder = 'Country code'
                        type='tel'
                        pattern='[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}'
                        value = { phoneFilter }
                        onChange = { this._updatePhoneFilter }
                        onFocus = { this._showCountryList }
                        onBlur = { this._hiddenCountryList }
                        onKeyDown = { this._handleKeyDown }
                    />
                </div>
                { showCountryList &&
                    <CountriesList
                        countryData = { this._getCountry }
                        searchValue = { phoneFilter }
                        countries = { allCountries } 
                        activeCountry = { cursor }
                    />}
            </section>
        )
    }
}