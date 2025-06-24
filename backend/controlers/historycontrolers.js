import { HistoryModule } from "../models/historymodel.js";

// GET
export const getHistMoment = async (req, res) => {
    try {
        const history = await HistoryModule.find()
        res.status(200).json(history)
    } catch (error) {
        res.status(500).json(error)

    }
    
}

//GET ONE
export const getHistMomentOne = async (req, res) => {
    try {
        console.log(req.params.id)
        const historyOne = await HistoryModule.findById(req.params.id)
        if (!historyOne) {
            return res.status(404).json({ message: 'History not found' });
        }
        res.status(200).json(historyOne)
    } catch (error) {
        res.status(500).json(error)
    }
    
}

// POST 
export const postHistMoment = async (req, res) => {
    try {
        const createHistory = await HistoryModule.create(req.body)
        res.status(201).json(createHistory)
    } catch (error) {
        console.log(error)
    }
}

//Delete
export const deleteHistory = async (req, res) => {
    try {
        const { id } = req.params
        const deletedHistory = await HistoryModule.findByIdAndDelete(id)

    if(!deletedHistory){
        res.status(400).json({message: "the moment was not found"})
    }

    res.status(200).json({message: "history deleted succesfully"}) 
    } catch (error) {
        res.status(500).json(error)
    }
    
}

//update
export const updateHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const historyChanges = req.body

        const updatedHistory = await HistoryModule.findByIdAndUpdate(id, historyChanges, {new: true})

        if(!updatedHistory){
            res.status(404).json({message: "the moment could not be updated"})
        }

        res.status(200).json({message: "history succesfully updated", historyChanges})
    } catch (error) {
        res.status(500).json(error)
    }
}
    
