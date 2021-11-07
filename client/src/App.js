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
import AgentUpdate from "./components/Admin/AgentUpdate";
import UserList from "./components/Admin/UserList";
import AgentList from "./components/Admin/AgentList";
import UserUpdate from "./components/Admin/UserUpdate";
import Blacklist from "./components/Admin/Blacklist";
import EditProfile from "./components/Pages/EditProfile";
import ApprovedList from "./components/Admin/ApprovedList";
import ViewReviews from "./components/Admin/ViewReviews";

function App () {

const [load, setLoad] = useState(true)
const [property, setProperty] = useState([''])
const [uniqueTown,setUniqueTown] = useState([''])
const [flatType,setflatType] = useState([''])
const [allPropertyFromServer,setAllPropertyFromServer] = useState([''])
const [allPropertyFromMongo,setAllPropertyFromMongo] = useState([''])
const [refreshListing, setRefreshListing] = useState(true)
const [googleMapProperty,setGoogleMapProperty] = useState()
const [googleMapLoad, setGoogleMapLoad] = useState(true)
const [startGoogleMapLoad, setStartGoogleMapLoad] = useState(false)


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
  
  const getPropertyLongLat =  async () => {
    setGoogleMapLoad(true)
    for (const pid in property2)
    {
      var town = property2[pid].street_name.split(' ').join('+')
      const response = await Axios.get(`https://developers.onemap.sg/commonapi/search?searchVal=${town+"+"+property2[pid].block}&returnGeom=Y&getAddrDetails=Y`)
      property2[pid]['latitude'] = response.data.results[0]?.LATITUDE? response.data.results[0].LATITUDE:0
      property2[pid]['longitude'] = response.data.results[0]?.LONGITUDE? response.data.results[0].LONGITUDE:0
    }
    setGoogleMapProperty(property2)
    setGoogleMapLoad(false)
    
  }

    if (allPropertyFromServer[0] !== ''){
    var property2 = [] //api and database without LongLat
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
        minListing--
        
      }
      if (minListing === 0)
      {
        minListing = 5
        tId++ 
      }
    }

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
    if (startGoogleMapLoad)
      getPropertyLongLat()
    console.log(property2)
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
        <Route path="/agentList" exact component={AgentList} />
        <Route path="/blacklist" exact component={Blacklist} />
        <Route path="/approvedList" exact component={ApprovedList} />
        <Route path="/agentList/:id" children={<AgentUpdate />}></Route>
        <Route path="/viewReviews/:id" children={<ViewReviews />}></Route>
        <Route path="/userList" exact component={UserList} />
        <Route path="/userList/:id" children={<UserUpdate />}></Route>
        <Route path="/profile" exact component={Profile} />
        <Route path="/profile/description" component={Description} />
        <Route path="/profile/:id" children={<EditProfile />}></Route>
        <Route exact path="/DisplayListings">
         <DisplayListings property={property} uniqueTown={uniqueTown} flatType={flatType} googleMapLoad={googleMapLoad} googleMapProperty={googleMapProperty} setStartGoogleMapLoad={setStartGoogleMapLoad}/> 
        </Route>
        <Route exact path="/DisplayListings/:propertyId" render={(props) => <PropertyListing {...props} property={property} />} />
      </Switch>
    </Box>
  </Router>
);
}
export default App;
