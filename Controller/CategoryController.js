const express = require("express")
const mongoose = require("mongoose")
const Category = require("../model/Category")
const cloudinary = require("cloudinary")

exports.AddCategory = async (req, res) => {
    try {
        const { Name , Image } = req.body

        let imagesLinks

        result = await cloudinary.v2.uploader.upload(Image, {
            folder: 'categoryimage'
        });
        
        imagesLinks = {
            public_id: result.public_id,
            url: result.secure_url
        }
        
                // console.log(result, 'res')
                // console.log(imagesLinks, 'links1')

        const categorys = await Category.create({
            Name : Name , Image : imagesLinks
        })

        if (!categorys) {
            res.status(400).json({error : "category is not added"})
            return
        }

        if (categorys) {
            await categorys.save()
            res.status(200).json({message : "category is added" , categorys})
            return
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({error : "We Cannot Add Category"})
    }
}

exports.GetAllCategory = async (req, res) => {
    try {
        const categorys = await Category.find();

        if (!categorys) {
            res.status(400).json({error : "We Cannot Get Category List"})
            return
        }

        if (categorys) {
            res.status(200).json({message : "We  Get Category List" , categorys})
            return
        }
        
    } catch (error) {
        res.status(400).json({error : "We Cannot Get Category"})
    }
}