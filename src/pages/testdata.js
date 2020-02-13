import React, {useState, useEffect} from 'react';
import Layout from "../components/layout"
import CSVReader from 'react-csv-reader'
import ReactPaginate from 'react-paginate';

const TestData = () => {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [prevState, setPrevState] = useState(null);
  const [slice, setSlice] = useState({f: 0, s: 20})

  useEffect(() => {
    setDisplayData(data.slice(0, 20));
  }, [data])

  const onPageClick = args => {
    let page = args.selected + 1
    if(page > prevState){
      if(slice.f === 0){
        setSlice({
          f: 20,
          s: page * 20
        })
      }else{
        setSlice({
          f: (page * 20) - 20,
          s: page * 20
        })
      }
    }else{
      setSlice({
        f: ((page * 20) - 20),
        s: page * 20
      })
    }
    setPrevState(args.selected)
    setDisplayData(data.slice(slice.f, slice.s))
  }

  return (
    <Layout>
      <div className="container-sm">
        <div className="row">
          <div className="col">
            <CSVReader onFileLoaded={data => setData(data)} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">PPM</th>
                  <th scope="col">Temperature</th>
                  <th scope="col">Humidity</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((data, index) => {
                  let time = `${data[8]}:${data[9]}:${data[10]}`
                  return (
                  <tr key={index}>
                    <td>{data[1]}</td>
                    <td>{data[2]}</td>
                    <td>{data[3]}</td>
                    <td>{time}</td>
                  </tr>
                )})}
              </tbody>
            </table>
            <div style={{color: 'black', display: 'flex', justifyContent: 'center'}}>
              <ReactPaginate
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'}
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={data.length / 20}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(args) => onPageClick(args)}
                subContainerClassName={'pages pagination'}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="footer borderbox">
              © {new Date().getFullYear()}, Built by
              <a href="#">{``}WAYDSB Thesis2020</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TestData