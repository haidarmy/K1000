import React, {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SalesReportTemplate} from '../../container';
import {getUserSalesReport} from '../../redux/action/SalesReportAction';

const SalesReportPage = () => {
  const dispatch = useDispatch();
  const {
    getUserSalesReportLoading: dataReportLoading,
    getUserSalesReportResult: dataReportResult,
    getUserSalesReportError: dataReportError,
  } = useSelector(state => state.SalesReportReducer);
  const handleSalesData = useMemo(
    () => ({
      dataReportLoading,
      dataReportResult,
      dataReportError,
    }),
    [dataReportError, dataReportResult, dataReportLoading],
  );
  const handleTimeFrameData = useCallback(
    (uid, timeFrame, isFirstRender) => {
      dispatch(getUserSalesReport(uid, timeFrame, isFirstRender));
    },
    [dispatch],
  );
  return (
    <SalesReportTemplate
      salesData={handleSalesData}
      onTimeFrameData={handleTimeFrameData}
      headerTittle="Laporan Penjualan"
      type="SALES"
    />
  );
};

export default SalesReportPage;
