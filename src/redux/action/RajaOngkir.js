import axios from 'axios';
import {
  API_HEADER_RAJAONGKIR,
  API_RAJAONGKIR,
  API_TIMEOUT,
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  showError,
} from '../../utils';

export const CALCULATE_SHIPPING_COST = 'CALCULATE_SHIPPING_COST';

export const calculateShippingCost = (
  origin = '501',
  destination = '114',
  weight = 3000,
) => {
  console.log(origin + ' ' + destination + ' ' + weight);
  return dispatch => {
    dispatchLoading(dispatch, CALCULATE_SHIPPING_COST);

    const formDataJne = new URLSearchParams();
    formDataJne.append('origin', origin);
    formDataJne.append('destination', destination);
    formDataJne.append('weight', weight);
    formDataJne.append('courier', 'jne');

    const formDataPos = new URLSearchParams();
    formDataPos.append('origin', origin);
    formDataPos.append('destination', destination);
    formDataPos.append('weight', weight);
    formDataPos.append('courier', 'pos');

    const formDataTiki = new URLSearchParams();
    formDataTiki.append('origin', origin);
    formDataTiki.append('destination', destination);
    formDataTiki.append('weight', weight);
    formDataTiki.append('courier', 'tiki');

    Promise.all([
      axios({
        method: 'POST',
        url: API_RAJAONGKIR + 'cost',
        timeout: API_TIMEOUT,
        headers: API_HEADER_RAJAONGKIR,
        data: formDataJne,
      }),
      axios({
        method: 'POST',
        url: API_RAJAONGKIR + 'cost',
        timeout: API_TIMEOUT,
        headers: API_HEADER_RAJAONGKIR,
        data: formDataPos,
      }),
      axios({
        method: 'POST',
        url: API_RAJAONGKIR + 'cost',
        timeout: API_TIMEOUT,
        headers: API_HEADER_RAJAONGKIR,
        data: formDataTiki,
      }),
    ])
      .then(response => {
        // Success
        console.clear();
        const res = response.map(res => {
          return 'testos', res.data.rajaongkir.results[0];
        });
        console.log('res', res);
        dispatchSuccess(dispatch, CALCULATE_SHIPPING_COST, res ? res : []);
      })
      .catch(error => {
        dispatchError(dispatch, CALCULATE_SHIPPING_COST, error.message);
        showError(error.message);
      });
  };
};
