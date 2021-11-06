import React from 'react'
import Property from '../Property/Property'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import AlertTitle from '@mui/material/AlertTitle'
import SeachBarWithFilter from '../Search/SeachBarWithFilter'
import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Pagination from '@mui/material/Pagination';
import Map from '../Property/Map'; // Import map

const DisplayListings = ({ property, uniqueTown, flatType, googleMapLoad, googleMapProperty }) => {


    const [closeAlert, setCloseAlert] = useState(true)
    const [propertyFiltered, setPropertyFiltered] = useState([])
    const [propertyFiltered2, setPropertyFiltered2] = useState([])
    const [loading, setLoading] = useState(false)

    const location = useLocation()
    const { searchQuery } = location.state
    const [searchQueryNew, setSearchQueryNew] = useState(searchQuery)
    const [filterByTown, setFilterByTown] = useState([])
    const [filterByPrice, setFilterByPrice] = useState([0, 1200000])
    const [filterByFlatType, setFilterByFlatType] = useState([])

    const [pagenationLength, setPagenationLength] = useState(0)
    const [page,setPage] = useState(1)

    const handleChange = (event, value) => {

        if (value >= 1 && value <= pagenationLength) {
            setPage(value)
            const indexOfLastPost = value * 15
            const indexOfFirstPost = indexOfLastPost - 15
            setPropertyFiltered2(propertyFiltered.slice(indexOfFirstPost, indexOfLastPost))
            window.scrollTo(0, 0)
        }
      }

    const bySearchQuery = (property, searchQueryNewUpperCase) => {

        return property.town.toString().toUpperCase() === searchQueryNewUpperCase
    }
    const byTown = (property) => {

        return filterByTown.includes(property.town.toString().toUpperCase())
    }

    const byPrice = (property) => {

        return Number(property.resale_price) >= filterByPrice[0] && Number(property.resale_price) <= filterByPrice[1]
    }

    const byFlatType = (property) => {

        return filterByFlatType.includes(property.flat_type.toString().toUpperCase())
    }


    useEffect(() => {



        if (searchQueryNew.searchQuery === undefined || searchQueryNew.searchQuery === '' || searchQueryNew.searchQuery === null) {

            if (filterByTown.length === 0)

                if (filterByFlatType.length === 0)

                    if (filterByPrice[0] === 0 && filterByPrice[1] === 1200000)
                        setPropertyFiltered(property)
                    else
                        setPropertyFiltered(property.filter((property) => byPrice(property)))
                else
                    if (filterByPrice[0] === 0 && filterByPrice[1] === 1200000)
                        setPropertyFiltered(property.filter((property) => byFlatType(property)))
                    else
                        setPropertyFiltered(property.filter((property) =>
                        byFlatType(property) && byPrice(property)))
            else
                if (filterByFlatType.length === 0)

                        if (filterByPrice[0] === 0 && filterByPrice[1] === 1200000)
                            setPropertyFiltered(property.filter((property) => byTown(property)))
                        else
                            setPropertyFiltered(property.filter((property) => byTown(property) && byPrice(property) ))
                else
                        if (filterByPrice[0] === 0 && filterByPrice[1] === 1200000)
                            setPropertyFiltered(property.filter((property) => byTown(property) && byFlatType(property) ))
                        else
                            setPropertyFiltered(property.filter((property) =>
                            (byTown(property) && byFlatType(property)) && byPrice(property) ))
                
        }
        else {
            const searchQueryNewUpperCase = searchQueryNew.searchQuery.toUpperCase()


            if (filterByTown.length === 0)

                if (filterByFlatType.length === 0)

                    if (filterByPrice[0] === 0 && filterByPrice[1] === 1200000)

                        setPropertyFiltered(property.filter((property) => bySearchQuery(property, searchQueryNewUpperCase) ))
                    else

                        setPropertyFiltered(property.filter((property) =>
                            bySearchQuery(property, searchQueryNewUpperCase) && byPrice(property) ))
                else
                    if (filterByPrice[0] === 0 && filterByPrice[1] === 1200000)

                        setPropertyFiltered(property.filter((property) =>
                            bySearchQuery(property, searchQueryNewUpperCase) && byFlatType(property) ))
                    else
                        setPropertyFiltered(property.filter((property) =>
                            bySearchQuery(property, searchQueryNewUpperCase) && byFlatType(property) &&
                            byPrice(property) ))
            else
                   
                if (filterByFlatType.length === 0)

                    if (filterByPrice[0] === 0 && filterByPrice[1] === 1200000)

                        setPropertyFiltered(property.filter((property) => bySearchQuery(property, searchQueryNewUpperCase) || byTown(property) ))
                    else

                        setPropertyFiltered(property.filter((property) =>
                            (bySearchQuery(property, searchQueryNewUpperCase) || byTown(property)) && byPrice(property) ))
                else
                    if (filterByPrice[0] === 0 && filterByPrice[1] === 1200000)

                        setPropertyFiltered(property.filter((property) =>
                            (bySearchQuery(property, searchQueryNewUpperCase) || byTown(property)) && byFlatType(property) ))
                    else
                        setPropertyFiltered(property.filter((property) =>
                            (bySearchQuery(property, searchQueryNewUpperCase) || byTown(property)) && byFlatType(property) && byPrice(property)))
            
        
        }

    }, [searchQueryNew, filterByTown, filterByPrice,filterByFlatType, property])

    useEffect (() => {

        if(propertyFiltered.length < 1)
            setCloseAlert(true)
        else    
            setPagenationLength(Math.ceil(propertyFiltered.length/15))
            
        var endIndex = 15
        if (propertyFiltered.length<15)
             endIndex = propertyFiltered.length
        setPropertyFiltered2(propertyFiltered.slice(0,15))
        setPage(1)
    },[propertyFiltered])

    return (

        <Box  >
            <Box>
                <SeachBarWithFilter
                    setsearchQueryNew={setSearchQueryNew}
                    setCloseAlert={setCloseAlert}
                    setfilterByTown={setFilterByTown}
                    setfilterByPrice={setFilterByPrice}
                    setFilterByFlatType={setFilterByFlatType}
                    searchQueryNew={searchQueryNew}
                    uniqueTown={uniqueTown} 
                    flatType={flatType}/>
            </Box>
            <Box sx={{ display: 'flex' }} >
                <Box style={{ width: '50%', margin: 5, padding: 5 }}>
                    {propertyFiltered.length < 1 && closeAlert &&
                        <Alert sx={{ mt: 2 }} action={<IconButton size='small' onClick={() => { setCloseAlert(false) }}> <CloseIcon fontSize="inherit" /> </IconButton>}
                            severity="error">
                            <AlertTitle>Error</AlertTitle>
                            <strong> No listings found. Please try again. </strong>
                        </Alert>}
                    {propertyFiltered2.length >= 1 && <Pagination sx={{ mt: 2, ml: 30 }} size="large" count={pagenationLength} color="primary" page={page} onChange={handleChange} showFirstButton showLastButton />}
                    {propertyFiltered[0] === '' ? <CircularProgress /> : propertyFiltered2.map((property, index) => (
                        <Property key={index} property={property} />
                    ))}
                    {propertyFiltered2.length >= 1 && <Pagination sx={{ mt: 2, ml: 30 }} size="large" count={pagenationLength} color="primary" page={page} onChange={handleChange} showFirstButton showLastButton />}
                </Box>
                <Box sx={{ width: '50%', padding: 5}} >
                    {googleMapLoad? <CircularProgress/>:<Map  property={googleMapProperty}/> }
                </Box>
            </Box>
        </Box>
    )

}

export default DisplayListings