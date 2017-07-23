import modelExtend from 'dva-model-extend'
import { queryURL } from '../utils'
import { remove } from '../services/client'
import * as clientsService from '../services/clients'
import { pageModel } from './common'
import { config } from '../utils'
import { notification } from 'antd'

const { query }  = clientsService 
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'client',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create'
  },
  effects: {
    *query({ payload = {} }, { call, put }){
      const data = yield call(query, payload)
      if(data){
        yield put ({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || config.pageSize,
              total: data.total,
            }
          }
        })
      }
    },
    *'delete' ({ payload }, { call, put, select }){
      const data = yield call(remove, {id: payload })
      if(data.success){
        yield put({ type: 'query' })

        notification['success']({
          message: '删除成功'
        });
      }else{
        throw data
      }
    },
  },
  reducers: {
    showModal(state, { payload }){
      return { ...state, ...{ payload }, modalVisible: true }
    },
    hideModal(state){
      return { ...state, modalVisible: false }
    }
  },
  subscriptions: {
    setup({dispatch, history }){
      history.listen(location => {
        if(location.pathname === '/client'){
          dispatch({
            type: 'query',
            payload: location.query
          })
        }
      })
    },
  },
})
