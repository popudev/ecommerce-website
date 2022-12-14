import { loginSuccess } from '~/reducers/actions/authenAction';
import { updateAccount } from '~/reducers/actions/recoverAction';
import checkStatusErrorApi from '~/utils/checkStatusErrorApi';
import httpRequest from '~/utils/httpRequest';
import { getAccessToken } from '~/utils/localStorage';

import { loading } from '~/components/Loading/core';

export const getInfoUser = async () => {
  try {
    loading.run();
    const accessToken = getAccessToken();
    const res = await httpRequest.get(`/user`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    loading.done();
    return res;
  } catch (err) {
    return checkStatusErrorApi(err);
  }
};

export const updateInfoUser = async (user, dispatch) => {
  try {
    loading.run();
    const accessToken = getAccessToken();
    const res = await httpRequest.patch(`/user`, user, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(loginSuccess(res));
    return loading.done().success('Updated information');
  } catch (err) {
    return checkStatusErrorApi(err);
  }
};

export const changePasswordUser = async (passwords) => {
  try {
    loading.run();
    const accessToken = getAccessToken();
    await httpRequest.patch(`/user/password`, passwords, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    return loading.done().success('Updated information');
  } catch (err) {
    return checkStatusErrorApi(err);
  }
};

export const getUserByEmailOrPhone = async (search, dispatch, navigator) => {
  try {
    loading.run();
    const res = await httpRequest.get(`/user/find/account`, {
      params: {
        search,
      },
    });
    dispatch(updateAccount(res));
    navigator('/recover/intiate', { replace: true });
    return loading.done().succ;
  } catch (err) {
    return checkStatusErrorApi(err);
  }
};
