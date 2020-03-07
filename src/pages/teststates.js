import React, {useState, useEffect} from 'react';
import Layout from "../components/layout"
import styled from 'styled-components';
import firebase from '../firebase'
import RenderData from '../components/RenderData'
import RenderPMSData from '../components/RenderPMSData'

const TestStates = () => {
  const [data, setData] = useState([])
  const [node, setNode] = useState('usc-mc')

  const addtemp = 10;

  const addData = async (node) => {
    const db = await firebase.firestore();
    const time = new Date()
    db.collection('aqms-cebu').doc(node).collection('states').doc().set({
      humidity: 100,
      no2: addtemp + 1,
      so2: addtemp + 2,
      pm10: addtemp + 3,
      pm25: addtemp + 4,
      temp: addtemp + 5,
      timestamp: time.getTime()
    }).then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }

  useEffect(() => {
    let unsubscribe = firebase.firestore().collection('aqms-cebu').doc(node).collection('states').orderBy('timestamp').onSnapshot(snapshot => {
      const newData = [];
      snapshot.docs.forEach(d => {
        newData.push(d.data());
      });
      setData(newData.sort((a, b) => b.timestamp - a.timestamp));
    }); 
    
    return () => {
      unsubscribe()
    }
  }, [node, setData]);

  let renderComponent = null
  if(node === 'usc-mc'){
    renderComponent = <RenderData data={data} />
  }else if(node === 'usc-sc'){
    renderComponent = <RenderData data={data}/>
  }

  const onChangeHandler = (e) => {
    setNode(e.target.value)
  }

  return (
    <Layout>
      <Style>
        <div className="container-sm">
          <div className="row">
            <div className="col statesHeader">
              <div className="form-group">
                <label>Select Node</label>
                <select className="form-control customSelect" onChange={e => onChangeHandler(e)} value={node}>
                  <option>usc-mc</option>
                  <option>usc-sc</option>
                </select>
              </div>
              {/* <button className="floatRight" onClick={() => addData(node)}>Add data</button> */}
            </div>
          </div>
          <div className="row">
            <div className="col" style={{color: 'black'}}>
              {renderComponent}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="footer page-footer borderbox">
                © {new Date().getFullYear()}, Built by
                <a href="#">{``}WAYDSB Thesis2020</a>
              </div>
            </div>
          </div>
        </div>
      </Style>
    </Layout>
  )
}

const Style = styled.div`
  .customSelect {
    width: 200px;
  }
`;

export default TestStates