import { useEffect, useState } from 'react'


function App() {
  const maxPage = 50

  const [page, setPage] = useState(1)
  const [estates, setEstates] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8080/api/estates?page=${page}`).then(res => res.json()).then(data => {
      setEstates(data)
    })
  
  }, [page, setEstates]);

  const EstateList = estates.map((estate: any, i) =>
    <div className='card' key={i}>
      <img src={estate.image} alt="estate" />
      <h1>{estate.name}</h1>
    </div>
  );

  const Pagination = Array.from(Array(maxPage).keys()).map((i) =>
    <button className={
      (page === i + 1 ? 'active' : '')
      + (i - 4 < page && page < i + 6 ? '' : 'hidden')
    } onClick={() => setPage(i + 1)} key={i}>{i + 1}</button>
  );

  return (
    <>
      <div className='estateList'>
          {EstateList}
      </div>
      <div className='pagination'>
        {<button onClick={() => setPage(1)} hidden={page==1}>Start</button>}
        {Pagination}

        {<button onClick={() => setPage(maxPage)} hidden={page==maxPage}>End</button>}
      </div>
    </>
  )
}

export default App
