import axios from "axios";
const API_URL = process.env.REACT_APP_API_BACKEND;

export class BlockService {
    static async getDataApiFromBsc(objectData) {
        return await axios.post(API_URL + "/api/blocks/data", objectData);
    }
}