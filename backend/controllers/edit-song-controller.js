const { editSong } = require('../services/edit-song.service');

async function EditSong(req, res, next) {
    try {
        let song = req.body;
        let  songId = req.params.id
        console.log("See the song before edit:");
        console.log(song);
        
        const editedSong = await editSong(song, songId);
        console.log("See song after edit:");
        console.log(editedSong);
        
        if (!editedSong.success) {
            res.status(404).json({ error: editedSong.error });
        } else { 
            res.status(200).json({
                song: editedSong.song,
                success: true,
                message: "Song Updated Successfully"
            });
        }
    } catch (error) {
        res.status(500).json({error: process.env.NODE_ENV === 'development' ? error.message : "Unexpected error occurred", success: false });
    }
}

module.exports = {
    EditSong
};
