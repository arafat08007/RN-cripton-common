import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from './store';
import prodctionapi from '~/prodctionapi';

export interface GetListProductionDept {
  Count: string;
  Id: string;
  DeptName: string;
 
}
export interface GetListDeptInputOutput{
  Count: string;
  Id: string;
  DeptName: string;
}

export interface GetOrderBasicByJob {
  Id: string;
	BuyerName: string;
	StyleName: string;
	ColorName: string;
	Qty: string;
	PrdQty: string;
	SizeName: string;
}

export interface GetOrderSizeWiseBreakdown {
  Id: string;
	BuyerName: string;
	StyleName: string;
	ColorName: string;
	Qty: string;
	PrdQty: string;
	SizeName: string;
}


interface ProductionState {
  proddept: GetListProductionDept[];
 // requisitions: { [key: string]: Requisition };
  
  inputoutput: GetListDeptInputOutput[];
  loading: boolean;
}

const initialState: ProductionState = {
  proddept: [], 
  inputoutput: [],
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    gotDepartment(state, { payload }: PayloadAction<GetListProductionDept[]>) {
      state.proddept = payload;
      state.loading = false;
    },

    gotinout(state, { payload }: PayloadAction<GetListDeptInputOutput[]>) {
      state.inputoutput = payload;
    },
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload;
    },
  },
});


// no need=============================================
/*
export const getApprovalSummary = (filters?: {
  LocId?: string;
  sDate?: string;
  eDate?: string;
  status?: string;
  ReqNo?: string;
}): AppThunk => async (dispatch, getState) => {
  const user = getState().auth.user;
  dispatch(gotSummary([]));
  dispatch(setLoading(true));
  try {
    const { data } = await prodctionapi.get('/SspReqApprovalSummary', {
      params: {
        EmpId: user?.EmpId, //'6914c387-70e4-4a1d-93ea-ea73ed365d2f', //
        SrcEmpId: user?.EmpId, // '6914c387-70e4-4a1d-93ea-ea73ed365d2f', //
        LocId: filters?.LocId || user?.LocId,
        Status: filters?.status || 'Pending',
        ReqNum: filters?.ReqNo || '',
        sDate: filters?.sDate || '',
        eDate: filters?.eDate || '',
      },
    });
    dispatch(gotSummary(data));
  } catch (e) {
    dispatch(setLoading(false));
    // throw e;
  }
};



export const getMyApprovalSummary = (filters?: {
  LocId?: string;
  sDate?: string;
  eDate?: string;
  status?: string;
  ReqNo?: string;
}): AppThunk => async (dispatch, getState) => {
  const user = getState().auth.user;
  dispatch(gotSummary([]));
  dispatch(setLoading(true));
  try {
    const { data } = await api.get('/SspMyReqSummary', {
      params: {
        EmpId: user?.EmpId, //'6914c387-70e4-4a1d-93ea-ea73ed365d2f', //
        SrcEmpId: user?.EmpId, // '6914c387-70e4-4a1d-93ea-ea73ed365d2f', //
        LocId: filters?.LocId || user?.LocId,
        Status: filters?.status || 'Pending',
        ReqNum: filters?.ReqNo || '',
        sDate: filters?.sDate || '',
        eDate: filters?.eDate || '',
      },
    });
    dispatch(gotSummary(data));
  } catch (e) {
    dispatch(setLoading(false));
    // throw e;
  }
};

export const getRequisition = (BaseInfo: string): AppThunk => async (
  dispatch,
  getState,
) => {
  const user = getState().auth.user;
  try {
    const { data } = await api.get('/SspViewReq', {
      params: {
        EmpId: user?.EmpId,
        BaseInfo,
      },
    });
    data.BaseInfo = BaseInfo;
    data.approverDetails = data.ReqApproverDetl.split('_==_') as string[];
    data.ReqItemDetl &&
      (data.itemDetails = data.ReqItemDetl.split('_==_') as string[]);
    data.ReqDetails &&
      (data.details = data.ReqDetails.split('_==_') as string[]);
    dispatch(gotRequisition(data));
  } catch (e) {
    throw e;
  }
};
*/

export const getDepartment = (): AppThunk => async (dispatch) => {
  try {
    const { data } = await prodctionapi.get('/GetListProductionDept');
    dispatch(gotDepartment(data));
  } catch (e) {
    throw e;
  }
};
export const getInOut = (): AppThunk => async (dispatch) => {
  try {
    const { data } = await prodctionapi.get('/GetListDeptInputOutput');
    dispatch(gotinout(data));
  } catch (e) {
    throw e;
  }
};




export const {

  gotDepartment,
  gotinout,

  setLoading,
} = authSlice.actions;

export default authSlice.reducer;
