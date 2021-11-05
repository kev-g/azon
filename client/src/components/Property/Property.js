import React from 'react'
import { Box, Card, Typography,  Grid } from '@mui/material'
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

const Property = ({ property, index }) => {

    const storePropertyInfo = () => {
        localStorage.setItem("property", JSON.stringify(property))
    }

    return (
        <Card sx={{ display: 'flex', margin: 2 }} >
            <Box sx={{ width: '50%', display: 'flex' }}>
                <CardMedia style={{ height: 300 }} 
                    component="img"
                    image={property.selectedFile? property.selectedFile:"https://picsum.photos/id/1029/4887/2759"} 
                    alt={property.description}
                />
            </Box>
            <Box sx={{ width: '50%', display: 'flex' }}>
               
                <Grid container>
                    <Grid container>
                        <Grid item xs={12} sx = {{textAlign:'center'}}>
                            <Typography variant='h5' >
                                {property.town} {property.flat_type}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}sx = {{float:'left',m:1}} >
                            <Typography sx={{ pt: 5 }} variant='h5'>Street: {property.street_name}</Typography>
                            <Typography variant='h5'>Block: {property.block}</Typography>
                            <Typography variant='h5'>Floor Area (sqm): {property.floor_area_sqm}</Typography>
                        </Grid>
                    </Grid>
                    <Grid sx={{alignItems:'flex-end', m:1}} container>
                            <Grid sx={{ }} item xs>
                                <Typography variant='h4' >
                                    ${property.resale_price}
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <a href={`/DisplayListings/${property._id}`} target={"_blank"} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                    <Button sx={{float: 'right' }} onClick={storePropertyInfo} variant='contained' size="small">View Listing</Button>
                                </a>
                            </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    )
}

export default Property
