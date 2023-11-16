import axios from "axios"

export default class Service {

    static async getGameById (id)  {
        const response = await axios.get(`http://localhost:3001/games/${id}`)
        return response.data 
    }


    static async getUsers () {
        const response = await axios.get(`http://localhost:3001/users`)
        return response.data
    }


    static async getComments () {
        const response = await axios.get(`http://localhost:3001/comments`)
        return response.data
    }

}