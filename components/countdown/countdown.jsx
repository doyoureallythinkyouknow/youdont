/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import styles from './countdown.module.scss';

dayjs.extend(relativeTime);

const Countdown = ({ userId, userRank, isExisting }) => {
  const [days, setDays] = useState(null);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);

  useEffect(() => {
    const calcNewYear = setInterval(() => {
      const dateFuture = new Date('02-01-2021');
      const dateNow = new Date();

      let s = Math.floor((dateFuture - (dateNow)) / 1000);
      let m = Math.floor(s / 60);
      let h = Math.floor(m / 60);
      const d = Math.floor(h / 24);

      h -= (d * 24);
      m = m - (d * 24 * 60) - (h * 60);
      s = s - (d * 24 * 60 * 60) - (h * 60 * 60) - (m * 60);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }, 1000);
    return () => {
      clearInterval(calcNewYear);
    };
  }, []);

  return (
    <div className={styles.countdown}>
      {isExisting
        && <img src="logo.png" alt="???" />}
      <div className={styles.time}>
        {days}
        {' '}
        days,
        {' '}
        {hours}
        {' '}
        hours,
        {' '}
        {minutes}
        {' '}
        minutes,
        {' '}
        {seconds}
        {' '}
        seconds
      </div>
      <div>You are now a part of The Perquisition. It is in your best interest to keep the code to this page a secret. Come back soon.</div>
      <div className={styles.instructions}>
        Below is your member key. You will not want anyone else to know it. When you return, use it to gain entry. Your progress is now being tracked. We&apos;ve all been there.
         
        You are ranked:
        {' '}
        {userRank}
        /???
      </div>
      <div className={styles.code}>{userId}</div>
    </div>
  );
};

export default Countdown;
