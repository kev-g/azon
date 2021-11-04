import Button from '@mui/material/Button';

const LocationInfoBox = ({ property, info }) => {

    const storePropertyInfo = () => {
        localStorage.setItem("property", JSON.stringify(property))
    }

    // onClick = () => {
        
    // }

    return (
        <div className="location-info">
            <h2>Property Listing Info</h2>
            <ul>
        {/* <li>ID: <strong>{ info._id }</strong></li> */}
        <li>Town: <strong>{ info.town }</strong></li>
        <li>Address: <strong>{ info.block } { info.street_name }</strong></li>
        {/* <li>Street Name: <strong>{ info.street_name }</strong></li> */}
        <li>Resale Price: $<strong>{ info.resale_price }</strong></li>
        {/* <li>Button to view more details</li> */}
        <li>
            {/* <a href={`/DisplayListings/${info._id}`} target={"_blank"} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Button sx={{float: 'right' }} onClick={storePropertyInfo} variant='contained' size="small">View more details</Button>
            </a> */}
        </li>
            </ul>
        </div>
    )
}

export default LocationInfoBox