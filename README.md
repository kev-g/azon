How to start?
1. open up 2 terminals
2. cd into client & server folders individually
3. npm install and npm start both
4. now the app should run! (localhost:3000 for client, localhost:5000/listings (This just displays the json data from DB))

	1. Client(frontend) - mainly work on the "src" folder
	2. Server(backend) - connected to mongoDB 

(Testing accounts)
1. login via azoncz2006@gmail.com gmail account (User only)
2. Manual login 
	1. (User: jon@gmail.com, pwd: 123)
	2. (Agent: alan@gmail.com or steve@gmail.com, pwd: 123)
	3. (Admin: admin@gmail.com, pwd 123) //login through Agent Login

-------------------------------------------------------------------------------------------------------------
6/11 Bug fixes & Updates:
- Manage/Edit Users/Agents
- View Blacklist
- Blacklist Agents


5/11 Bug fixes & Updates:
- Edited Agent status page(diff views depending on status)
- Added google map, markers and infobox
- Fixed listing details (Agent pic is now fetched from profile info)
- Admin part

Some disclaimer:
- Refreshing at display listings page will crash website as i only fetch from api once for google map
- After going to "Display listing pages", have to wait around 5-10s for api to finish fetching the long lat, where the map will then display the markers.
- Some lag/slow loading time fetched from api, see if can optimize (App.js in client folder)

27/10 Bug fixes & Updates:
- Made some minor changes (colors, styles etc)
- Pop-up chart on Navbar

26/10 Bug fixes & Updates:
- Edited listing schema to match with property listing page
- Design and beautify some parts of the UI (Navbar & buttons)
- Agents can only view his own created listings
- AgentHub CSS 
- AgentProfile CSS

25/10 Bug fixes & Updates:
- Edited create listing form
- Edited agent, listing schema
- Added agent status (pending) to prevent new agents from creating listings without approval by admin
- Edits on property listing fields


Some Issues/Improvements to be made:
- Update password on agent not working (Resolved)
- UI design for agent hub (CSS etc) (Resolved but can be improved)
- AgentProfile (Update is not instant)
- Agent hub reviews, (dont put in onClick, just display the data directly on page.) (Unresolved)

Not yet implemented: (As of 27/10)
- Forget Password*
- google maps *
- charts & stats (Can be improved)
- Admin page (Havent integrate)


------------------------------------------------------------------------------------------------------------

12/10: updates since last meeting:
- Added user sign up, manual login, google login
- do not allow edit/delete of listings that do not belong to the creator (Eg. Jon can only delete/edit his own listing)
- users can like their own listings or other listings by diff users (Feature may be removed)

Some disclaimer/issues:
- adding/edit functions may lag/dont display upon submission, just refresh the page.


Not yet implemented/integrated: (u guys can take a look, feel free to clone and work on it)
- user info login via gmail acc not stored in "user" db table, instead its under "listings" creator field, currently stored as token. (Maybe can add as a field in user?)
- User-profile
- reset password
- integrate JR & JC part 


