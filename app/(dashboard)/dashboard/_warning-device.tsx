'use client';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const MobileWarningAlret = ({ isMobile }: { isMobile: boolean }) => {
  useEffect(() => {
    if (isMobile) {
      toast.warning('Mobile device detected, please use a desktop for better experience', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  }, [isMobile]);
  return <></>;
};

export default MobileWarningAlret;
