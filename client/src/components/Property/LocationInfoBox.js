import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
const LocationInfoBox = ({info, setLocationInfo }) => {

    return (
        <div className="location-info">
            <IconButton sx={{float:'right'}} size='small' onClick={() => { setLocationInfo(false) }}> <CloseIcon fontSize="inherit" /> </IconButton>
            <h2>Property Listing Info</h2>
            <ul>
        {/* <li>ID: <strong>{ info._id }</strong></li> */}
        <li>Town: <strong>{ info.town }</strong></li>
        <li>Address: <strong>{ info.block } { info.street_name }</strong></li>
        <li>Resale Price: $<strong>{ info.resale_price }</strong></li>
        <li>
            <a href={`/DisplayListings/${info._id}`} target={"_blank"} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Button sx={{float: 'right' }}  variant='contained' size="small">View more details</Button>
            </a>
        </li>
            </ul>
        </div>
    )
}

export default LocationInfoBox