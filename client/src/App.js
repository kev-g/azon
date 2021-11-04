import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DisplayListings from './components/Pages/DisplayListings'
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import AgentAuth from "./components/Auth/AgentAuth";
import Profile from "./components/Pages/Profile";
import Description from "./components/Pages/Description";
import Reset from "./components/Pages/Reset";
import AgentHub from "./components/Pages/AgentHub";
import AgentDetail from "./components/Pages/AgentDetail";
import SearchBar from './components/Search/SearchBar'
import PropertyListing from './components/Property/PropertyListing'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Loader from './components/Property/Loader'

function App () {

const [load, setLoad] = useState(true)
const [property, setProperty] = useState([''])
const [uniqueTown,setUniqueTown] = useState([''])
const [flatType,setflatType] = useState([''])
const [allPropertyFromServer,setAllPropertyFromServer] = useState([''])
const [allPropertyFromMongo,setAllPropertyFromMongo] = useState([''])
const [refreshListing, setRefreshListing] = useState(true)
const [property3, setProperty3] = useState([''])

useEffect(() => {

  const getProperty =  async () => {
    
    const response = await Axios.get('http://localhost:5000/listings')
    setAllPropertyFromMongo(response.data)
    const response2 =  await Axios.get('https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&limit=2000')
    setAllPropertyFromServer(response2.data.result.records)
    setLoad(false)
    
  }

  getProperty()
  console.log("fetch listing")

},[refreshListing])

useEffect(() => {

    if (allPropertyFromServer[0] != ''){
    console.log(allPropertyFromServer)
    var property2 = [] //api and database without LongLat
    var property3 = [] //with LongLat
    var uniqueTown2 = []
    const propertyFromServer = allPropertyFromServer
    propertyFromServer.sort((a,b)=>(a.town>b.town)?1:-1)
    uniqueTown2 = ([...new Set(propertyFromServer.map(item => item.town))].sort())
    var minListing = 5
    var tId = 0

    for (const pId in propertyFromServer)
    {
      if ((propertyFromServer[pId]['town'] === uniqueTown2[tId]) && !property.includes(propertyFromServer[pId])) 
      {
        property2.push(propertyFromServer[pId]) 
        property3.push(propertyFromServer[pId]) 
        minListing--
        
      }
      if (minListing === 0)
      {
        minListing = 5
        tId++ 
      }
    }

    const getPropertyLongLat =  async () => {
      for (const pid in property3)
      {
        var town = property3[pid].street_name.split(' ').join('+')
        const response = await Axios.get(`https://developers.onemap.sg/commonapi/search?searchVal=${town+"+"+property3[pid].block}&returnGeom=Y&getAddrDetails=Y`)
        property3[pid]['latitude'] = response.data.results[0]?.LATITUDE? response.data.results[0].LATITUDE:0
        property3[pid]['longitude'] = response.data.results[0]?.LONGITUDE? response.data.results[0].LONGITUDE:0
      }
      setProperty3(property3)
    }
    getPropertyLongLat()
    console.log(property3)
    console.log("new p3 above")
   
    for (var i in allPropertyFromMongo)
    {
      if( allPropertyFromMongo[i]['flat_type'] !== undefined)
        allPropertyFromMongo[i]['flat_type'] = allPropertyFromMongo[i]['flat_type'].toUpperCase()
      if( allPropertyFromMongo[i]['town'] !== undefined)
        allPropertyFromMongo[i]['town'] = allPropertyFromMongo[i]['town'].toUpperCase()
      property2.push(allPropertyFromMongo[i])
    }
    property2.sort((a,b)=>(a.town.toString().toUpperCase()>b.town.toString().toUpperCase())?1:-1)
    setUniqueTown([...new Set(property2.map(item => item.town))].sort())
    setflatType([...new Set(property2.map( item => item.flat_type))].sort())
    setProperty(property2)
    console.log("updated listing")
}
},[allPropertyFromServer]) 


return (
  <Router>
    <Box sx={{width:'90%',pl:10}}>
      <Navbar />
      
      <Switch>
        <Route exact path="/">
              {load? <CircularProgress color="secondary"/>:<SearchBar uniqueTown={uniqueTown} refreshListing={refreshListing} setRefreshListing={setRefreshListing}/>}
        </Route>
        <Route path="/createListing" exact component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/agentHub" exact component={AgentHub} />
        <Route path="/agentHub/:id" children={<AgentDetail />}></Route>
        <Route path="/reset" component={Reset} />
        <Route path="/agent" exact component={AgentAuth} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/profile/description" component={Description} />
        <Route exact path="/DisplayListings">
         <DisplayListings property={property} uniqueTown={uniqueTown} flatType={flatType} property3={property3}  /> 
        </Route>
        <Route exact path="/DisplayListings/:propertyId" render={(props) => <PropertyListing {...props} property={property} />} />
      </Switch>
    </Box>
  </Router>
);
}
export default App;
