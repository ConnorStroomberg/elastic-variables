  
const axios = require('axios');

const host = 'https://lifelines.dev.molgenis.org'

const api = axios.create({
  baseURL: host + '/api',
  headers: { 'x-molgenis-token': process.env.EDGE_USER_TOKEN }
})

const getData = async (pageSize, pageOffSet) => {
    const num = pageSize ? pageSize : 100
    const start = pageOffSet ? pageOffSet : 0
    const attrs = '~id,id,variable_id(id,name,label),subsection_id(id,name)'
    const resp = await api.get(`/v2/lifelines_subsection_variable?attrs=${attrs}&start=${start}&num=${num}`)
    return resp.data.items.map((item) => {
        let result = {
            variable_id: item.variable_id.id,
            variable_name: item.variable_id.name,
            subsection_id: item.subsection_id.id,
            subsection_name: item.subsection_id.name
        }

        if(item.variable_id.label) {
            result.variable_label = item.variable_id.label
        }

        return result
    })
}

module.exports = {
    getData
}

// getData().then((resp) => {
//     console.log(resp)
// }, (err) => console.log(err))