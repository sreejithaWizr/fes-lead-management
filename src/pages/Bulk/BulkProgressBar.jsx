import React, { useEffect, useState } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getBulkUploadStatus } from '../../api/services/BulkAPI/BulkAPIs';
import { setStatus, clearJobId } from "../../store/bulkSlice";

const IN_PROGRESS = 'In Progress';
const COMPLETED = 'Completed';
const FAILED = 'Failed';
const ERROR = 'Error';

const DEFAULT_IN_PROGRESS_MESSAGE = 'Uploading Leads';
const DEFAULT_COMPLETED_MESSAGE = 'Upload Completed';
const DEFAULT_FAILED_MESSAGE = 'Upload Error';
const DEFAULT_ERROR_MESSAGE = 'Error fetching status';

// Progress Bar in lead Page for Bulk
const BulkProgressBar = () => {
  const { jobId, status, message } = useSelector((state) => state.bulkUpload);
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const [pollingError, setPollingError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  const POLLING_INTERVAL = 5000;
  const RETRY_INTERVAL = 10000;
  const MAX_RETRIES_PER_CALL = 5;
  const MAX_TOTAL_RETRIES = 10;
  const CLEAR_MESSAGE_DELAY = 60000;

  useEffect(() => {
    let pollingInterval;
    let timer;

    const fetchJobStatus = async (retries = 0) => {
      if (retryCount >= MAX_TOTAL_RETRIES) {
        dispatch(setStatus({ status: ERROR, message: 'Error: Maximum retry limit exceeded' }));
        setProgress(0);
        setPollingError(true);
        clearInterval(pollingInterval);
        dispatch(clearJobId());
        return;
      }

      try {
        const response = await getBulkUploadStatus(jobId);
        const { notificationstatus, message: apiMessage, percentage, countsucessrecord, counterrorrecord } = response.data[0];

        if (notificationstatus === IN_PROGRESS) {
          dispatch(setStatus({ status: notificationstatus, message: apiMessage || DEFAULT_IN_PROGRESS_MESSAGE }));
          setProgress(percentage || 0);
          setPollingError(false);
        } else if (notificationstatus === COMPLETED) {
          dispatch(setStatus({ status: notificationstatus, message: apiMessage }));
          setSuccessCount(countsucessrecord || 0);
            setTimeout(() => {
            setProgress(100); // Delay to trigger smoother UI perception
            }, 1000); // small delay for smoother transition
          setPollingError(false);
          clearInterval(pollingInterval);
          timer = setTimeout(() => {
            dispatch(clearJobId());
          }, CLEAR_MESSAGE_DELAY);
        } else if (notificationstatus === FAILED || notificationstatus === ERROR) {
          dispatch(setStatus({ status: notificationstatus, message: apiMessage }));
          setErrorCount(counterrorrecord || 0);
          setProgress(0);
          setPollingError(true);
          clearInterval(pollingInterval);
          dispatch(clearJobId());
        }
      } catch (error) {
        console.error('Error fetching job status:', error);
        if (retries < MAX_RETRIES_PER_CALL) {
          setTimeout(() => {
            setRetryCount((prev) => prev + 1);
            fetchJobStatus(retries + 1);
          }, RETRY_INTERVAL);
        } else {
          dispatch(setStatus({ status: ERROR, message: 'Temporary error fetching status, retrying...' }));
          setPollingError(true);
          setRetryCount((prev) => prev + 1);
        }
      }
    };

    if (jobId && !pollingError) {
      if (status === COMPLETED) {
        dispatch(setStatus({ status: COMPLETED, message }));
        setProgress(100);
        fetchJobStatus(0);
      } else if (status !== FAILED && status !== ERROR) {
        dispatch(setStatus({ status: status || IN_PROGRESS, message: message || DEFAULT_IN_PROGRESS_MESSAGE }));
        setProgress(0);
        pollingInterval = setInterval(() => fetchJobStatus(0), POLLING_INTERVAL);
        fetchJobStatus(0);
      } else {
        dispatch(setStatus({ status, message: status === ERROR ? DEFAULT_ERROR_MESSAGE : `${DEFAULT_FAILED_MESSAGE} ${errorCount} Errors` }));
        setProgress(0);
        dispatch(clearJobId());
      }
    } else {
      dispatch(setStatus({ status: null, message: null }));
      setProgress(0);
    }

    return () => {
      clearInterval(pollingInterval);
      clearTimeout(timer);
    };
  }, [jobId, status, message, dispatch, pollingError, successCount, errorCount]);

  const renderTopLabel = () => {
    switch (status) {
      case IN_PROGRESS:
        return DEFAULT_IN_PROGRESS_MESSAGE;
      case COMPLETED:
        return DEFAULT_COMPLETED_MESSAGE;
      case FAILED:
      case ERROR:
        return DEFAULT_FAILED_MESSAGE;
      default:
        return '';
    }
  };

  const renderTopRight = () => {
    switch (status) {
      case IN_PROGRESS:
        return `${Math.round(progress)}%`;
      case COMPLETED:
        return `${successCount} Leads`;
      case FAILED:
      case ERROR:
        return `${errorCount} Errors`;
      default:
        return '';
    }
  };

  return (
    <>
      {status && (
        <Box
          sx={{
            width: '232px',
            border: '1px solid #E0E0E0',
            borderRadius: '12px',
            backgroundColor: '#FFFFFF',
            p: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {/* First Row */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
            variant="body2"
            sx={{
            fontFamily: "Proxima Nova, sans-serif",
            fontWeight: 500,
            fontSize: '11px',
            lineHeight: '140%',
            letterSpacing: 0,
            textAlign: 'right',
            color: '#17222B',
            }}
            >
            {renderTopLabel()}
            </Typography>
            <Typography
            variant="body2"
            sx={{
            fontFamily: "Proxima Nova, sans-serif",
            fontWeight: 700,
            fontSize: '11px',
            lineHeight: '140%',
            letterSpacing: 0,
            textAlign: 'right',
            color: '#17222B',
            }}
            >
            {renderTopRight()}
            </Typography>
            </Box>


          {/* Second Row */}
          {status === IN_PROGRESS ? (
            <LinearProgress
              variant="determinate"
              value={progress}
               sx={{
                height: '6px',
                borderRadius: '3px',
                backgroundColor: '#E0E0E0',
                transition: 'all 0.6s ease-in-out', // Smooth transition
                '& .MuiLinearProgress-bar': {
                backgroundColor: '#2196F3',
                transition: 'width 0.6s ease-in-out', // Smooth progress change
                },
                }}
            />
          ) : (
            <Typography variant="body2" color="textSecondary" 
            sx={{
            fontFamily: "Proxima Nova, sans-serif",
            fontWeight: 400,
            fontSize: '11px',
            lineHeight: '140%',
            textAlign: 'left',
            letterSpacing: 0,
            color: '#17222B',
            }}>
              {message}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default BulkProgressBar;
