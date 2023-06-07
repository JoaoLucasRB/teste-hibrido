//react/Title.tsx
import React, { useEffect, useState } from 'react';

function Testimony() {
  const [testimonies, setTestimonies] = useState([])

  /**
   * Fetch the list of testimonies from MasterData and set the list to state "testimonies".
   *
   */
  function fetchTestimonies () {
    fetch("/api/dataentities/DJ/search?_fields=name,city,testimony,date", {
      headers: {
		    "Accept": "application/json",
		    "Content-Type": "application/json",
        "REST-Range": "resources=0-10",
      }
    })
      .then(res => res.json())
      .then(res => {
        setTestimonies(res);
      })
  }

  useEffect(() => {
    fetchTestimonies()
  }, [])

  return (
    <div>
      Testimony
    </div>
  )
}

export default Testimony