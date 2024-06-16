import axios from 'axios'
//const baseUrl = 'http://localhost:3001/persons'
const baseUrl = '/api/persons'

const getAllContacts = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const createNewContact = (personObj) => {
    const request = axios.post(baseUrl, personObj)
    return request.then(response => response.data)
}

const deleteContact = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then((response) => response.data)
}

const updateContact = (id, personObj) => {
    const request = axios.put(`${baseUrl}/${id}`, personObj)
    return request.then(response => response.data)
}

const ContactService = { getAllContacts: getAllContacts,
                createNewContact: createNewContact, 
                deleteContact: deleteContact,
                updateContact: updateContact }

export default ContactService
