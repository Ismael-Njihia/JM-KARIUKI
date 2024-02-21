import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';


dotenv.config();
const API_KEY = process.env.VIDEOSDK_API_KEY;
const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;
const VIDEO_SDK_URL = process.env.VIDEOSDK_API_ENDPOINT;

//GET /api/videoMeeting
//Public

const getVideoMeeting = async (req, res) => {
    const options = { expiresIn: '1h', algorithm: 'HS256' };

    const payload = {
        "api_key": API_KEY,
        Permissions: ["allow_join", "allow_modify", "allow_record"],
    };

    const token = jwt.sign(payload, SECRET_KEY, options);
    res.json({ token});
};

//CREATE VIDEO MEETING
//POST /api/videoMeeting
//Private
const createVideoMeeting = async (req, res) => {
    
    const {token, region} = req.body;
    if(!token){
        return res.status(400).json({message: 'Token is required'});
    }
    if(!region){
        return res.status(400).json({message: 'Region is required'});
    }
    const url = `${VIDEO_SDK_URL}/api/meetings`;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({})
    };
    fetch(url, options)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(result => res.json(result))
        .catch(error => {
            console.error('Fetch error:', error);
            res.status(500).json({message: 'Server error', error: error.message});
        });
};

//VALIDATE VIDEO MEETING using ID
//POST /api/videoMeeting/validate/:id
//Private
const validateVideoMeeting = async(req, res) =>{
    const token = req.body.token;
    const meetingId = req.params.id;
    const url = `${VIDEO_SDK_URL}/api/meetings/${meetingId}`;

    const options = {
        method: 'POST',
        headers: {
            'Authorization': token,
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(result => res.json(result))
        .catch(error => console.error('error', error))
}



export { getVideoMeeting, createVideoMeeting, validateVideoMeeting};
