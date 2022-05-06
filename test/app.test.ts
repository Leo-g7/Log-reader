import app from '../src/app'
import { DatePrefixData, DatePrefixAndSizeData } from './data'
import request from 'supertest';

describe('Test GET /1/queries/count/<DATE_PREFIX>', () => {
  test('given /1/queries/count/2015', async () => {
    const response = await request(app).get('/1/queries/count/2015')
    expect(response.body).toStrictEqual(DatePrefixData[0]);
    expect(response.body).not.toStrictEqual(DatePrefixData[1]);
  })

  test('given /1/queries/count/2015-08', async () => {
    const response = await request(app).get('/1/queries/count/2015-08')
    expect(response.body).toStrictEqual(DatePrefixData[2]);
  })

  test('given /1/queries/count/2015-08-03', async () => {
    const response = await request(app).get('/1/queries/count/2015-08-03')
    expect(response.body).toStrictEqual(DatePrefixData[3]);
  })

  test('given /1/queries/count/2015-08-01 00:04', async () => {
    const response = await request(app).get('/1/queries/count/2015-08-01 00:04')
    expect(response.body).toStrictEqual(DatePrefixData[4]);
  })
})

describe('Test GET /1/queries/popular/<DATE_PREFIX>?size=<SIZE>', () => {
  test('given /1/queries/popular/2015?size=3', async () => {
    const response = await request(app).get('/1/queries/popular/2015?size=3')
    expect(response.body).toStrictEqual(DatePrefixAndSizeData[0]);
    expect(response.body).not.toStrictEqual(DatePrefixAndSizeData[1]);
    expect(response.body).not.toStrictEqual(DatePrefixAndSizeData[2]);
  })

  test('given /1/queries/popular/2015-08-02?size=5', async () => {
    const response = await request(app).get('/1/queries/popular/2015-08-02?size=5')
    expect(response.body).toStrictEqual(DatePrefixAndSizeData[3]);
  })
})
