import { test, describe, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import sinon from 'sinon'
import { getHistory } from '../controllers/history.js'
import Location from '../models/Location.js'

describe('getHistory', () => {
  let req, res, locationFindStub, locationCountStub

  beforeEach(() => {
    req = {
      query: {},
    }
    res = {
      json: sinon.stub(),
      status: sinon.stub().returnsThis(),
    }
    locationFindStub = sinon.stub(Location, 'find')
    locationCountStub = sinon.stub(Location, 'countDocuments')
  })

  afterEach(() => {
    sinon.restore()
  })

  test('returns paginated history with default values', async () => {
    const mockData = [
      { id: '1', name: 'Location 1' },
      { id: '2', name: 'Location 2' },
    ]
    locationFindStub.returns({
      sort: sinon.stub().returnsThis(),
      skip: sinon.stub().returnsThis(),
      limit: sinon.stub().resolves(mockData),
    })
    locationCountStub.resolves(10)

    await getHistory(req, res)

    assert.deepStrictEqual(res.json.firstCall.args[0], {
      page: 1,
      limit: 5,
      totalRecords: 10,
      totalPages: 2,
      data: mockData,
    })
  })

  test('handles custom pagination parameters', async () => {
    req.query = { page: '2', limit: '3' }
    locationFindStub.returns({
      sort: sinon.stub().returnsThis(),
      skip: sinon.stub().returnsThis(),
      limit: sinon.stub().resolves([]),
    })
    locationCountStub.resolves(15)

    await getHistory(req, res)

    assert.deepStrictEqual(res.json.firstCall.args[0], {
      page: 2,
      limit: 3,
      totalRecords: 15,
      totalPages: 5,
      data: [],
    })
  })
})
