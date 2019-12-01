const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })


const addToIndex = async (index, objectToIndex) => {
  await client.index({
    index,
    body: objectToIndex
  })
}

const search = async (index, searchString) => {
  const { body } = await client.search({
    index,
    body: {
      query: {
        query_string: {
          query: searchString
        }
      }
    }
  })

  return body.hits
}

const refresh = async (index) => client.indices.refresh({ index })

module.exports = {
  addToIndex,
  search,
  refresh
}

// const index = 'catelog-variables'
// const sampleObject = {
//   variable_id: 8808,
//   name: 'FOOD27',
//   label: 'Alcoholic drinks (freq) past month',
//   sub_section_id: 5,
//   sub_section_name: 'Alcohol use'
// }

// const run = async () => {
//   // await addToIndex(cvIndex, sampleObject)
//   // await client.indices.refresh({ index })
//   const result = await search(index, '*us*')
//   return result
// }

// run().then((res) => console.log(res), () => console.log('error'))
