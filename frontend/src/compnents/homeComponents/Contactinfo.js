import React from 'react'

const Contactinfo = () => {
    return (
        <div className="contactInfo container">
            <div className="row">
                <div className="col-12 col-md-4 contact-Box">
                    <div className="box-info">
                        <div className="info-image"> <i className="fas fa-phone-alt"></i></div>

                        <h5>Call us 24/7</h5>
                        <p>0971155903</p>
                    </div>
                </div>
                <div className="col-12 col-md-4 contact-Box">
                    <div className="box-info">
                        <div className="info-image"><i className="fas fa-map-marker"></i></div>
                        <h5>HEADQUARTER</h5>
                        <p>Aruha Njiro Pepsi</p>
                    </div>
                </div>
                <div className="col-12 col-md-4 contact-Box">
                    <div className="box-info">
                        <div className="info-image"><i className="fas fa-fax"></i></div>
                        <h5>Fax</h5>
                        <p>012 345 678</p>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Contactinfo