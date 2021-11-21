import React from 'react';
import './Estate.scss'

const Estate = ({ estate, handleClick, selectedEstates }) => {

    // if the current estate object is in the selectedEstates object, this variable returns true to ensure proper styling of the estate (border is added)
    const isSelected = Object.values(selectedEstates).some(selectedEstate => selectedEstate.id === estate.id)

    return (
        <div className={`estate ${isSelected ? 'estate--selected' : ''}`} onClick={() => handleClick(estate)}>
            <img className="estate__img" src={estate.images[0]} alt="" />
            <p className="estate__title">
                {estate.name_extracted} {estate.locality}
            </p>
        </div>
    )
}

export default Estate
