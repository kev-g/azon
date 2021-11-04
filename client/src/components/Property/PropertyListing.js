import React from 'react'
import { Container, Typography, Box, Grid, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import CardMedia from '@mui/material/CardMedia'
import Skeleton from '@mui/material/Skeleton'
import Axios from 'axios'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const PropertyListing = (props) => {

    const [propertyDetails, setPropertyDetails] = useState(JSON.parse(localStorage.getItem('property')))
    const [agentDetails, setAgentDetails] = useState([])
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
    const [load, setLoad] =  useState(true)
    const [highestPrice, setHighestPrice] =  useState([0,0])
    const [lowestPrice, setLowestPrice] =  useState([0,0])
    const [avgPrice, setAvgPrice] =  useState(0)
    const [avgPriceDates, setAvgPriceDates] = useState([])


    useEffect(() => {

        const getAgent =  async () => {
        var response = await Axios.get('http://localhost:5000/agent')
        var agent = response.data.filter(item => item._id === propertyDetails.creator)
        setAgentDetails(agent)
        }

        const getTownPriceRange =  async () => {
            var town = propertyDetails.town.split(' ').join('+')
            var flatType = propertyDetails.flat_type.split(' ').join('+')
            var response = await Axios.get(`https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&filters={"town":"${town}","flat_type":"${flatType}"}&limit=1000&sort=month+desc`)
            var prices = response.data.result.records
            var highestPrice=[0,0],lowestPrice=[9999999999,0],avgPrice=0,empty = 0
            var dates = ([...new Set(prices.map(item => item.month))].sort())
            for (var i = 0;i <prices.length;i++)
            {

                if (prices[i].resale_price !== '-') 
                {
                    avgPrice += Number(prices[i].resale_price)

                    if (Number(prices[i].resale_price) > highestPrice[0])
                    {
                        highestPrice[0] = Number(prices[i].resale_price)
                        highestPrice[1] = i
                    }
                        

                    if (Number(prices[i].resale_price) < lowestPrice[0])
                    {
                        lowestPrice[0] = Number(prices[i].resale_price)
                        lowestPrice[1] = i
                    }
                        
                }
                else
                    empty++

            }
            avgPrice  = parseInt(avgPrice/(prices.length-empty),10)
            setHighestPrice(prices[highestPrice[1]])
            setLowestPrice(prices[lowestPrice[1]])
            setAvgPrice(avgPrice)
            setAvgPriceDates([dates[dates.length-1],dates[0]])
        }

        getAgent()
        getTownPriceRange()
        setLoad(false)  
    }, [])

    return (
        <Box>
            <Container sx={{
                width: '100%',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#9e9e9e',
                paddingTop: 3,
                borderRadius: 5
            }}>
                <CardMedia sx={{ marginTop: 2, height: 500 }}
                    component="img"
                    image={propertyDetails.selectedFile? propertyDetails.selectedFile:"https://picsum.photos/id/1029/4887/2759"}
                    alt={propertyDetails.description}
                />
                <Grid container alignItems="stretch">
                    <Grid item xs={8} sx={{ mt:3 }}>
                        <Typography variant='h2'>{propertyDetails.town} {propertyDetails.flat_type}</Typography>
                        <Typography sx={{ pt: 5 }} variant='h3'>Street: {propertyDetails.street_name}</Typography>
                        <Typography variant='h3'>Block: {propertyDetails.block}</Typography>
                        <Typography variant='h3'>Flat Model: {propertyDetails.flat_model}</Typography>
                        <Typography variant='h3'>Floor Area: {propertyDetails.floor_area_sqm}</Typography>
                        <Typography variant='h3'>Remaining Lease: {propertyDetails.remaining_lease}</Typography>
                        <Typography sx={{ pt: 5 }} variant='h3'>Price: ${propertyDetails.resale_price}</Typography>
                 
                        <Accordion sx={{mt:2,mb:2,width:600}} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                            >
                                <Typography variant='h5' sx={{pl:2}}> Check historic prices for {propertyDetails.town.toLowerCase()} {propertyDetails.flat_type.toLowerCase()}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant='h6'> <strong>Highest</strong>: {highestPrice?.resale_price? "$"+highestPrice.resale_price:"not found"}
                                <strong>&emsp;Sold</strong>: {highestPrice?.month? highestPrice.month:"not found"}</Typography>
                                <Typography variant='h6' sx={{pt:2}}> <strong>Lowest</strong>: {lowestPrice?.resale_price? "$"+lowestPrice.resale_price:"not found"}
                                <strong>&emsp;Sold</strong>: {lowestPrice?.month? lowestPrice.month:"not found"}</Typography>
                                <Typography variant='h6'sx={{pt:2}}> <strong>Average Price ({avgPriceDates[1]} to {avgPriceDates[0]})</strong>: {avgPrice? "$"+avgPrice:"not found"}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    {user?.result ? 

                    <Grid item xs sx={{ mt: 3 }} zeroMinWidth>
                        <CardMedia sx={{ height: 300 }}
                            component="img"
                            //image={"https://picsum.photos/id/237/200/300"}
                            image={agentDetails[0]?.profile_pic ? agentDetails[0]?.profile_pic :'https://www.back-tobasics.org/wp-content/uploads/2017/05/default-profile-pic.png'}
                            alt={'agent name'}
                        />
                   <h2>Agent Name:   {!load && <Typography sx={{}} variant='h4'>{agentDetails[0]?.name ? agentDetails[0].name : 'John Doe'}</Typography>}</h2>
                   <h2>Email:  {!load && <Typography flexWrap sx={{}} variant='h4'>{agentDetails[0]?.email ? agentDetails[0].email : 'JDoe@gmail.com'}</Typography>}</h2>
                   <h2>Contact Number:   {!load && <Typography flexWrap sx={{}} variant='h4'>{agentDetails[0]?.phoneNumber ? agentDetails[0].phoneNumber : '91234567'}</Typography>}</h2>
                    </Grid> :

                    <Grid item xs sx={{ mt: 3 }}>
                        <Skeleton variant="rectangular" height={300} />
                        <Typography sx={{}} variant='h4'>Create an account to view agent details</Typography>
                    </Grid>}
            </Grid>
        </Container>
        </Box>
    )
}

export default PropertyListing