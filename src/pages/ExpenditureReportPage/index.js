import React, {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SalesReportTemplate} from '../../container';
import {getUserExpenditureReport} from '../../redux/action/ExpenditureReportAction';

const ExpenditureReportPage = () => {
  const dispatch = useDispatch();
  const {
    getUserExpenditureReportLoading: dataReportLoading,
    getUserExpenditureReportResult: dataReportResult,
    getUserExpenditureReportError: dataReportError,
  } = useSelector(state => state.ExpenditureReportReducer);
  const handleExpenditureData = useMemo(
    () => ({
      dataReportLoading,
      dataReportResult,
      dataReportError,
    }),
    [dataReportError, dataReportResult, dataReportLoading],
  );
  const handleTimeFrameData = useCallback(
    (uid, timeFrame, isFirstRender) => {
      dispatch(getUserExpenditureReport(uid, timeFrame, isFirstRender));
    },
    [dispatch],
  );
  return (
    <SalesReportTemplate
      salesData={handleExpenditureData}
      onTimeFrameData={handleTimeFrameData}
      headerTittle="Laporan Pengeluaran"
      type="EXPENDITURE"
    />
  );
};

export default ExpenditureReportPage;
