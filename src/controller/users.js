const fs = require("fs"); //always put server things at top
const model = require("../models/users");
const mongoose = require("mongoose");
const User = model.User;

// exports.createProducts = async (req, res) => {
//   //gives images blank array , gives id of created doc
//   console.log("req.body = ", req.body);
//   const product = new Product(req.body);
//   try {
//     const resp = await product.save();
//     res.status(201).json(resp);
//   } catch (error) {
//     res.status(400).json(error);
//     console.log("error");
//   }
// };

exports.getAllUsers = async (req, res) => {
  const usersResp = await User.aggregate(
    //USERS ACTIVE
    //     [
    //     {        //STAGE 1
    //       $match: {
    //         isActive: false,
    //       },
    //     },
    //     {        //STAGE 2
    //       $count: "activeUsers", //we don't have any key related to active users but it still gives count of isActive users
    //     },
    //   ]

    //AVERAGE AGE
    // [
    //   {
    //     // $group: {
    //     //   _id: "$gender",           //able to group peoples base on gender like M and F
    //     // },
    //     $group: {
    //       //   _id: null,            //it's a one doc all peoples are in this doc (ALL M and F)
    //       _id: "$gender",           //gives Average of M and F seperately
    //       averageAge: {             //creates new key as averageAge which is number
    //         $avg: "$age",
    //       },
    //     },
    //   },
    // ]

    //TOP 2 MOST COMMON FRUITS
    // [
    //   {
    //     $group: {
    //       _id: "$favoriteFruit",
    //       count: {
    //         $sum: 1, //add all bananas and gives us banana etc count
    //       },
    //     },
    //   },
    //   {
    //     $sort: {
    //       count: -1, //for this count field exists but not for the real database
    //     },
    //   },
    //   {
    //     $limit: 2,      //gives top 2 favourate fruits
    //   },
    // ]

    //TOTAL NUMBER OF MALES AND FEMALES
    // [
    //   {
    //     $group: {
    //       _id: "$gender",
    //       count: {
    //         $count:"$gender"
    //         // $sum: 1,
    //       },
    //     },
    //   },
    // ]

    //WHICH COUNTRY HAVE HIGHEST NUMBER OF REGISTERED USERS
    // [
    //   {
    //     $group: {
    //       _id: "$company.location.country", //drill companies from nested object
    //       countriesCount: {
    //         $sum: 1,
    //       },
    //     },
    //   },
    //   {
    //     $sort: {
    //       countriesCount: -1,
    //     },
    //   },
    //   { $limit: 3 },
    // ]

    //LIST ALL UNIQUES COLOURS LISTED IN COLLECTION
    // [
    //   {
    //     $group: {
    //       _id: "$eyeColor",
    //     },
    //   },
    // ]

    //AVERGAE NUMBER OF TAGS PER USER tags=["",""]
    // [
    //   {
    //     $unwind: {
    //       path: "$tags", //it will create duplicates of each object with tags="enim",2nd obj tags="good" and all details remain same
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$_id",
    //       countTags: {
    //         $sum: 1,
    //       },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: null,
    //       avergaeNumberOfTags: {
    //         $avg: "$countTags",
    //       },
    //     },
    //   },
    // ]

    // [
    //   {
    //     $addFields: {
    //       numberOfTags: {
    //         $size: { $ifNull: ["$tags", []] },
    //       },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: null,
    //       avergaeNoTags: {
    //         $avg: "$numberOfTags",
    //       },
    //     },
    //   },
    // ]

    //HOW MANY USERS HAVE ENIM AS ONE THEIR TAGS
    // [
    //     {
    //         $match:{
    //             tags:"enim",
    //         }
    //     },
    //     {
    //         $count:"UserWithEnimTags"
    //     }
    // ]

    //NAMES AND AGE OF USERS WHO ARE INACTIVE AND HAVE VELIT AS A TAG
    // [
    //   {
    //     $match: {
    //       isActive: false,
    //       tags: "velit",
    //     },
    //   },
    //   {
    //     $project: {         //what all the fields you are looking for just give their names
    //       name: 1,
    //       age: 1,
    //     },
    //   },
    // ]

    //USERS HAVE PHONE NUMBER STARTED WITH "+1 (940)"
    // [
    //   {
    //     $match: {
    //       "company.phone": /^\+1 \(940\)/,
    //     },
    //   },
    //   {
    //     $count: "userCount",
    //   },
    // ]

    //WHO HAS REGISTERED MOST RECENTLY
    // [
    //   {
    //     $sort: {
    //       registered: -1,
    //     },
    //   },
    //   {
    //     $limit: 4,
    //   },
    //   {
    //     $project: {
    //       name: 1,
    //       registered: 1,
    //     },
    //   },
    // ]

    //CATEGORIZE THE USERS BY THEIR FAVOURATE FRUIT
    // [
    //   {
    //     $group: {
    //       _id: "$favoriteFruit",
    //       users: {
    //         $push: "$name",             //push name of users whose favourate fruit is banana etc
    //       },
    //     },
    //   },
    // ]

    //HOW MAY USERS HAVE 'ad' as the second tag in their list of tags
    // [
    //   {
    //     $match: {
    //       "tags.1": "ad",       //at second position I am looking for ad
    //     },
    //   },
    // ]

    //FIND USERS WHO HAVE BOTH "enim" AND "ad" AS TAGS
    // [
    //   {
    //     $match: {
    //       tags: {
    //         $all: ["enim", "ad"],
    //       },
    //     },
    //   },
    // ]

    //LIST ALL THE COMPANIES LOCATED IN USA WITH THEIR USERS COUNT
    // [
    //   {
    //     $match: {
    //       "company.location.country": "USA",
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: null,
    //       usersCount: {
    //         $sum: 1,
    //       },
    //     },
    //   },
    // ]

    //LOOKUP DATA FROM ANOTHER COLLECTION
    // [
    //   {
    //     $lookup: {
    //       from: "author",
    //       localField: "author_id",
    //       foreignField: "_id",
    //       as: "author_details",
    //     },
    //   },
    //   {
    //     $addFields: {
    //       author_details: {
    //         $first: "$author_details",
    //       },
    //     },
    //   },
    // ]
  );
  res.status(201).json(usersResp);
};
// exports.getSingleProduct = async (req, res) => {
//   console.log("params", req.params);
//   const id = req.params.id;
//   const productsResp = await Product.findById(id);
//   res.json(productsResp);
// };
// exports.updatePUTProducts = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const resp = await Product.findOneAndReplace({ _id: id }, req.body, {
//       new: true,
//     });
//     res.status(201).json(resp);
//   } catch (error) {
//     console.log("error", error);
//     res.status(400).json(error);
//   }
// };
// exports.updatePATCHProducts = async(req, res) => {
//   const id = req.params.id;
//   try {
//     const resp = await Product.findOneAndUpdate({ _id: id }, req.body, {
//       new: true,
//     });
//     res.status(201).json(resp);
//   } catch (error) {
//     console.log("error", error);
//     res.status(400).json(error);
//   }
// };
// exports.deleteProduct = async(req, res) => {
//   const id = req.params.id;
//   try {
//     const resp = await Product.findOneAndDelete({ _id: id });
//     res.status(201).json(resp);
//   } catch (error) {
//     console.log("error", error);
//     res.status(400).json(error);
//   }
// };
