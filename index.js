const es = require('./elastic')
const ds = require('./data-service')

const index = 'catelog-variables'

const loadIndex = async () => {
    const variableData = await ds.getData(4, 0)
    console.log('batch loaded')

    for (let i = 0; i < variableData.length; i++) {
        await es.addToIndex(index, variableData[i])
    }

    await es.refresh(index)

    console.log('done')
}

// loadIndex().then(res => console.log('success'), err => console.log('error'))

es.search(index, 'worri*').then(res => console.log(res.hits), err => console.log('error'))