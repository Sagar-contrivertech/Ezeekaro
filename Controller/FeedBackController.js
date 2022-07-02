const feedBack = require("../model/feedBack");

exports.addFeedBack = async (req, res) => {
    try {
        
        const userDetails = req.UserId._id
        const feedback = await feedBack.create({
            remark: req.body.remark,
            satisfaction: req.body.satisfaction,
            behaviour: req.body.behaviour,
            rating: req.body.rating,
            user: req.UserId._id
        })
        console.log(feedback);
      return res.status(200).json({ message: "Thanks for feedback", feedback })

    } catch (error) {
        res.status(400).json({ error: "Unable to add feedback" })
    }
}


exports.getFeedback = async (req, res) => {
    try {

        const feedback = await feedBack.find();

        if (!feedback) {
            res.status(400).json({error : "Unable to find feedback in try"})
            return
        }
        
        if (feedback) {
            res.status(200).json({message : "find feedback Succesfully" , feedback})
            return
        }

    } catch (error) {
        res.status(400).json({error : "Unable to find feedback"})
    }
}

exports.getFeedbackById = async (req, res) => {
    try {
        const feedback = await feedBack.findById(req.params.id).populate('user');
        

        if (!feedback) {
            res.status(400).json({error : "Unable to find feedback in try"})
            return
        }
        
        if (feedback) {
            res.status(200).json({message : "find feedback Succesfully" , feedback})
            return
        }

    } catch (error) {
        res.status(400).json({error : "Unable to find feedback"})
    }
}
