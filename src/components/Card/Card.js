import React from 'react'
import NumberFormat from 'react-number-format';
import './Card.scss'

const Card = ({ selectedEstates, estate, cardType }) => {


    const {
        images,
        name,
        prize_czk,
        locality,
        building_area,
        land_area,
        company_logo,
        company_name
    } = estate


    // function that returns a proper className for the element based on the corresponding variable value compared to the other Card, whereas propertyName is a string name of the variable, i.e. 'prize_czk', 'building_area' etc. this is why Object.keys({ propertyName })[0]) is passed as a parameter to this function because it returns 'propertyName' string
    const setBgColor = (propertyName) => {

        // getting the value of the property (current Card)
        const value = Number(estate[propertyName])

        // getting the cardType of the other Card
        const otherCardType = cardType === 'A' ? 'B' : 'A';

        // getting the value of the property (the other Card)
        const otherCardValue = Number(selectedEstates[otherCardType][propertyName]);

        // the variable to store the result into
        let className;

        // if this holds true, it is good news for building_area and land_area properties but not for prize_czk property (hence the green and red styling of the element background)
        if (value > otherCardValue) {
            if (propertyName === 'prize_czk') {
                className = 'card__row--red'
            }
            else {
                className = 'card__row--green'
            }
        }
        // if this holds true, it is bad news for building_area and land_area properties but not for prize_czk property (hence the green and red styling of the element background)
        else if (value < otherCardValue) {
            if (propertyName === 'prize_czk') {
                className = 'card__row--green'
            }
            else {
                className = 'card__row--red'
            }
        }

        // return the className
        return className;

    }

    return (
        <div className="card">
            <img className="card__img" src={images[0]} alt="" />
            <div className="card__content">
                <div className="card__title">
                    {name}
                </div>
                <div className="card__details">

                    <div className={`card__row ${setBgColor(Object.keys({ prize_czk })[0])}`}>
                        <p className="card__row-title">Price</p>
                        <p>
                            {/* NumberFormat component used to show spaces as a thousands separator */}
                            <NumberFormat thousandSeparator=' ' displayType="text" value={prize_czk} /> Kč
                        </p>
                    </div>
                    <div className="card__row">
                        <p className="card__row-title">Locality</p>
                        <p>
                            {locality}
                        </p>
                    </div>
                    <div className={`card__row ${setBgColor(Object.keys({ building_area })[0])}`}>
                        <p className="card__row-title">Floor area</p>
                        <p>
                            {building_area} m²
                        </p>
                    </div>
                    <div className={`card__row ${setBgColor(Object.keys({ land_area })[0])}`}>
                        <p className="card__row-title">Land area</p>
                        <p>
                            {land_area} m²
                        </p>
                    </div>

                </div>
                <div className="card__company">
                    {company_logo &&
                        <img className="card__company__img" src={company_logo} alt="" />
                    }
                    <p className="card__company__name">{company_name}</p>
                </div>
            </div>
        </div>
    )
}

export default Card
