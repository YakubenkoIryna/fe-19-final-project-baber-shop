import axios from "axios";

class Ajax {

    static async get(endpoint) {
        const {data} = await axios.get(`${process.env.REACT_APP_API}${endpoint}`)
        // console.log('get all data-->', data);
        return data
    }

    static async post(endpoint, object) {
        const {data} = await axios.post(`${process.env.REACT_APP_API}${endpoint}`, object, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `${localStorage.getItem('token')}`
            }
        })
        // console.log('post new data-->', data);
        return data;
    }

    static async put(endpoint, id, updatedObject) {
        const {data} = await axios.put(`${process.env.REACT_APP_API}${endpoint}/${id}`, updatedObject, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `${localStorage.getItem('token')}`
            }
        })
        // console.log('update old data-->', data);
        return data;
    }

    static async deleteRequest(endpoint, id) {
        const {data} = await axios.delete(`${process.env.REACT_APP_API}${endpoint}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `${localStorage.getItem('token')}`
            }
        })
        // console.log('delete data-->', data);
        return data;
    }
}

export default Ajax;