const User = require('../model/user')
const Product = require('../model/product')

const getProducts = async (req, res) => {
    // Write the code to get the product details
    try {
        const {userId} = req.params;
        const user = await User.findOne({email: userId});
        if (!user) {
            return res.status(404).send({"message": "User not found"})
        }
        const products = await Product.find({productId: {$in: user.productList}}).lean().exec();
        res.status(200).send(products);
    } catch(err) {
        console.error(err)
        res.status(404).send({"message": "Error in getting the product details"})
    }
};

const addProduct = async (req, res) => { 
    // Write the code to add the product details
    try {
        const {userId} = req.params;
        const user = await User.findOne({email: userId});
        if (!user) {
            return res.status(404).send({"message": "User not found"})
        }
        const pData = req.body;
        if (!pData.productId || !pData.productName || !pData.productDisc || !pData.inStock) {
            return res.status(400).send({"message": "Invalid input"})
        }
        if (pData.productId) {
            const existingProduct = await Product.findOne({productId: pData.productId}).lean().exec();
            if (existingProduct) {
                return res.status(409).send({"message": "Product already exists"})
            }
        }
        const newProduct = new Product(pData).save();
        user.productList.push(pData.productId);
        await user.save();
        res.status(200).send(user.productList);
    } catch (err) {
        console.error(err)
        res.status(400).send({"message": "Error in adding the product"}) 
    }
}

const deleteProduct = async (req, res) => {
    // Write the code to delete the product details
    try {
        const {userId} = req.params;
        const user = await User.findOne({email: userId});
        if (!user) {
            return res.status(404).send({"message": "User not found"})
        }
        await user.updateOne({$pull: "productList"});
        res.status(200).send({"message": "Products deleted successfully"})
    } catch (err) {
        console.error(err)
        res.status(400).send({"message": "Error in deleting the product"})
    }
}

module.exports = { getProducts, addProduct, deleteProduct };