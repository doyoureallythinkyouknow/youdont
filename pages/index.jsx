import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { throttle } from 'lodash';
import classnames from 'classnames';
import axios from 'axios';
import Countdown from '../components/countdown/countdown';
import styles from '../styles/Home.module.scss';

export default function Home() {
  const [value, setValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userRank, setUserRank] = useState(null);
  const [isExisting, setIsExisting] = useState(false);

  const handleTextChange = (e) => {
    setIsWrong(false);
    setValue(e.target.value);
  };

  const checkCode = async (v) => {
    setIsSaving(true);
    // const { data } = await axios.post('http://localhost:3001/code', {
    const { data } = await axios.post('https://perquisition-server.herokuapp.com/code', {
      code: v,
    });
    if (data.success === true) {
      setUserId(data.userId);
      setUserRank(data.userRank);
      setIsExisting(data.isExisting);
    } else {
      setIsWrong(true);
    }
    setValue('');
    setIsSaving(false);
  };

  const delayedCheckCode = useCallback(throttle((code) => checkCode(code), 1000,
    {
      leading: true,
    }), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    delayedCheckCode(value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>816413</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!userId
          ? (
            <>
              <div className={classnames(styles.indicator, {
                [styles.red]: isWrong,
              })}
              />
              <form onSubmit={handleSubmit}>
                <input disabled={isSaving} type="text" value={value} onChange={handleTextChange} />
                <button disabled={isSaving} type="submit">
                  <img src="logo.png" alt="???" height="24px" />
                </button>
              </form>
            </>
          )
          : <Countdown userId={userId} userRank={userRank} isExisting={isExisting} />}
      </main>
    </div>
  );
}
