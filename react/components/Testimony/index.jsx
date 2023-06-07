//react/Title.tsx
import React, { useEffect, useState } from 'react';
import styles from './styles.css'

function Testimony({
  SliderLayout
}) {
  const [testimonies, setTestimonies] = useState([])

  /**
   * Fetch the list of testimonies from MasterData and set the list to state "testimonies".
   *
   */
  function fetchTestimonies (props) {
    fetch("/api/dataentities/DJ/search?_fields=id,picture,name,city,testimony,date", {
      headers: {
		    "Accept": "application/json",
		    "Content-Type": "application/json",
        "REST-Range": "resources=0-10",
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log('res', res)
        setTestimonies(res);
      })
  }

  /**
   * Formats the received date from Masterdata to the format DD/MM/YYYY.
   *
   * @param {string} date The date to format.
   */
  function formatDate(date) {
    let objectDate = new Date(date);
    objectDate.setTime(objectDate.getTime() + (3*60*60*1000))
    let day = objectDate.getDate();
    let month = objectDate.getMonth() + 1;
    const year = objectDate.getFullYear();

    day = day < 10 ? `0${day}`: day;
    month = month < 10 ? `0${month}`: month;

    console.log('data', day, month, year)

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    fetchTestimonies()
  }, [])

  return (
    <SliderLayout>
      {testimonies.map(testimony => 
        <div className={styles.wrapper}>
          <div className={styles.container}>
            {testimony.picture ?
              <div className={styles.picture}>
                <img src={
                  `/api/dataentities/DJ/documents/${testimony.id}/picture/attachments/${testimony.picture}`
                } alt="customer-picture" />
              </div>
            : <></>}
            <div className={styles.name}>
              {testimony.name}
            </div>
            <div className={styles.testimony}>
              {testimony.testimony}
            </div>
            <div className={styles.city}>
              {testimony.city}
            </div>
            <div className={styles.date}>
              {formatDate(testimony.date)}
            </div>
          </div>
        </div>
      )}
    </SliderLayout>
  )
}

export default Testimony