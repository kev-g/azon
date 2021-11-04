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
import Loader from '../Property/Loader'

const DisplayListings = ({ property, uniqueTown, flatType }) => {


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

    const [mapTown,setMapTown] = useState(['ANG MO KIO','BEDOK','BISHAN','BUKIT BATOK'
    ,'BUKIT MERAH','BUKIT PANJANG','BUKIT TIMAH','CENTRAL AREA','CHOA CHU KANG'
    ,'CLEMENTI','GEYLANG','HOUGANG','JURONG EAST','JURONG WEST','KALLANG/WHAMPOA'
    ,'MARINE PARADE','PASIR RIS','PUNGGOL','QUEENSTOWN','SEMBAWANG','SENGKANG'
    ,'SERANGOON','TAMPINES','TOA PAYOH','WOODLANDS','YISHUN'])
    const [mapTownCount,setMapTownCount] = useState()
    const [mapLoad, setmapLoad] = useState(true)

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
            
        setLoading(false)

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
        setmapLoad(true)
        var sum = [] 
        for (var i = 0; i < 26; i++) {
            var count = 0
            for (var pid in property) {
                if (property[pid]['town']?.toUpperCase() === mapTown[i].toUpperCase())
                    count++
            }
            if (count>9)
                count = 9
            sum.push(count.toString())
        }
        setMapTownCount(sum)
        
        if (mapTownCount !==undefined)
            setmapLoad(false)
        
        //setLoading(false)
        
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
                       { propertyFiltered[0] !== '' && <Pagination sx={{mt:2,ml:30}} size="large" count={pagenationLength} color="primary" page={page} onChange={handleChange} showFirstButton showLastButton/>}
                    {propertyFiltered[0] === ''? <CircularProgress/>:propertyFiltered2.map((property, index) => (
                        <Property key={index} property={property} />
                    ))}
                    { propertyFiltered[0] !== '' && <Pagination sx={{mt:2,ml:30}} size="large" count={pagenationLength} color="primary" page={page} onChange={handleChange} showFirstButton showLastButton/>}
                </Box>
                <Box sx={{width: '50%', padding: 5,position:'sticky',top:0}} >

                { !loading ? <Map property={property} /> : <Loader /> }

                {/* {!mapLoad && <img height='800' src={`https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=original&lat=1.355998&lng=103.827209&zoom=11&height=512&width=512&polygons=&lines=&points=
            [1.3744388, 103.8417747,"255,255,0","${mapTownCount[0]}"] |[1.3275103,103.9325055,"255,255,0","${mapTownCount[1]}"] | [1.3553118, 103.8469869,"255,255,0","${mapTownCount[2]}"] | [1.3521604, 103.7521362,"255,255,0","${mapTownCount[3]}"] 
            | [1.2798632, 103.8056634,"255,255,0","${mapTownCount[4]}"] | [1.3823330, 103.7801951,"255,255,0","${mapTownCount[5]}"] | [1.3340005, 103.7940216,"255,255,0","${mapTownCount[6]}"] | [1.2945911, 103.8522304,"255,255,0","${mapTownCount[7]}"] 
            | [1.3944394, 103.7428353,"255,255,0","${mapTownCount[8]}"] | [1.3171510, 103.7614995,"255,255,0","${mapTownCount[9]}"] | [1.3252013, 103.8884978,"255,255,0","${mapTownCount[10]}"] | [1.3742828, 103.8816938,"255,255,0","${mapTownCount[11]}"]
             | [1.3437357, 103.7355943,"255,255,0","${mapTownCount[12]}"] | [1.3119713, 103.8679920,"255,255,0","${mapTownCount[13]}"] | [1.3482913, 103.7050698,"255,255,0","${mapTownCount[14]}"] | [1.3072596, 103.9021059,"255,255,0","${mapTownCount[15]}"]
              | [1.3791504, 103.9448651,"255,255,0","${mapTownCount[16]}"] | [1.4124428, 103.9050397,"255,255,0","${mapTownCount[17]}"] | [1.3022047, 103.7935534,"255,255,0","${mapTownCount[18]}"] | [1.4506333, 103.8178982,"255,255,0","${mapTownCount[19]}"]
               | [1.3918808, 103.8938037,"255,255,0","${mapTownCount[20]}"] | [1.3655774, 103.8667124,"255,255,0","${mapTownCount[21]}"] | [1.3571216, 103.9474557,"255,255,0","${mapTownCount[22]}"] | [1.3365591, 103.8538534,"255,255,0","${mapTownCount[23]}"]
                | [1.4412730, 103.7835971,"255,255,0","${mapTownCount[24]}"] | [1.4298845, 103.8401517,"255,255,0","${mapTownCount[25]}"] &color=&fillColor=`}></img>} */}
                </Box>
            </Box>
        </Box>
    )

}

export default DisplayListings