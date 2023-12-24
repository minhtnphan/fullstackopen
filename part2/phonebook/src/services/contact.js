import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAllContacts = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const createNewContact = (personObj) => {
    return axios.post(baseUrl, personObj)
}

const deleteContact = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then((response) => response.data)
}

const ContactService = { getAllContacts: getAllContacts,
                 createNewContact: createNewContact, 
                 deleteContact: deleteContact }

export default ContactService
