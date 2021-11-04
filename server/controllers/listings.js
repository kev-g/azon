import mongoose from 'mongoose'; // import mongoose to communicate with mongoDB
import postListing from '../models/postListing.js'; // Access the model

export const getListing = async (req, res) => {  // add async
 
    try{
        const postListings = await postListing.find();  // takes time, so add "await"
        //console.log(postListings);

        res.status(200).json(postListings); // return array of objs

    } catch(error) {
        res.status(404).json( { message: error.message });

    }

};

// https://www.restapitutorial.com/httpstatuscodes.html

export const createListing = async (req, res) => {
    const list = req.body;
    
    //const newListing = new postListing(list);
    const newListing = new postListing({ ...list, creator: req.userId, createdAt: new Date().toISOString() }); // set the creator to the userID

    try{
      await newListing.save();

      res.status(201).json(newListing);

    } catch(error) {
        res.status(409).json( { message: error.message });

    }

};



export const updateListing = async (req, res) => {
    //extract the id, /listings/123
    const { id } = req.params;
    
    // edit attributes here
    const { title, desc, creator, town, flat_type, block, street_name, floor_area_sqm, flat_model, remaining_lease, resale_price, selectedFile } = req.body;
    
    // check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No listing with id: ${id}`);

    const updatedListing = { title, desc, creator, town, flat_type, block, street_name, floor_area_sqm, flat_model, remaining_lease, resale_price, selectedFile, _id: id };

    await postListing.findByIdAndUpdate(id, updatedListing, { new: true });

    res.json(updatedListing); // save updatedListing

};

export const deleteListing = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No listing with id: ${id}`);

    await postListing.findByIdAndRemove(id);

    res.json({ message: "Listing deleted successfully." });
}

// Similar to update
export const likeListing = async (req, res) => {
    const { id } = req.params;

    // Check if its the correct user
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No listing with id: ${id}`);
    
    const listing = await postListing.findById(id);

    // find the index of the listing, convert userid to a string
    const index = listing.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
        // like the listing
        listing.likes.push(req.userId);  // push his own id
    } else {
        // dislike , loop thru all the id
        listing.likes = listing.likes.filter((id) => id !== String(req.userId));
    }

    const updatedListing = await postListing.findByIdAndUpdate(id, listing, { new: true });
    res.status(200).json(updatedListing);

    // const likedListing = await postListing.findByIdAndUpdate(id, { likeCount: listing.likeCount + 1 }, { new: true });
    // res.json(likedListing);
}