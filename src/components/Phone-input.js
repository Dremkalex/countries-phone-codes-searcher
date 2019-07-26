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
        countryList: countriesData.allCountries,
        showCountryList: false,
        initial: true
    }

    _updatePhoneFilter = ({ target: { value }}) => this.setState({
        phoneFilter: value,
        initial: false
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
        phoneFilter: code,
        showCountryList: false
    })

    _handleKeyDown = (e) => {
        const upKey = e.key === 'ArrowUp';
        const downKey = e.key === 'ArrowDown'

        if(!upKey && !downKey) return;

        e.preventDefault();
        const { cursor, countryList } = this.state;
        //const { allCountries } = countriesData;
        
        if (upKey && cursor > 0) {
            this.setState( prevState => ({
                cursor: prevState.cursor - 1,
                countryIso: countryList[prevState.cursor - 1].iso2,
                phoneFilter: countryList[prevState.cursor - 1].dialCode
            }))
        } else if (downKey && cursor < countryList.length - 1) {
            this.setState( prevState => ({
                cursor: prevState.cursor + 1,
                countryIso: countryList[prevState.cursor + 1].iso2,
                phoneFilter: countryList[prevState.cursor + 1].dialCode
            }))
        }
    }

    render() {
        const { cursor, phoneFilter, countryIso, countryList, showCountryList, initial } = this.state;
        //const { allCountries } = countriesData;
        const countries = initial ? countryList : countryList.length > 0 && countryList.filter(({dialCode}) => dialCode.startsWith(phoneFilter))
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
                        //searchValue = { phoneFilter }
                        countries = { countries } 
                        activeCountry = { cursor }
                    />}
            </section>
        )
    }
}