// Core
import React, { Component } from 'react';

//Instruments
import './styles.css';

export default class CountriesList extends Component {

    _getValue = (iso2, dialCode) => {
        this.props.countryData(iso2, dialCode);
    }

    render () {
        
        const { countries, activeCountry } = this.props;

        //const countries = searchValue ? allCountries.filter(({dialCode}) => dialCode.includes(searchValue)) : allCountries;
        //const countries =  allCountries;

        const countriesJSX = countries.length > 0 && countries.map(({name, dialCode, iso2}, index) => {
            const isActive = activeCountry === index ? 'active' : '';
            
            return (
                <li
                    key={`${iso2}-${index}`}
                    className = { isActive }
                    onClick = { () => this._getValue(iso2, dialCode) }
                >
                    <div className={`flag ${iso2}`} />
                    {`${name} +${dialCode}`}
                </li>
            )}
        )

        return(
            <ul >{countriesJSX}</ul>
        )
    }
}