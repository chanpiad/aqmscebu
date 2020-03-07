import React from 'react';
import HappyFace from "../assets/images/happy.png";
import styled from 'styled-components';

const styles = {
  spanMeasurements: {
    marginLeft: '15px',
    fontWeight: 'normal'
  }
}

const AQContent = ({nodeName, data}) => {
  // console.log(data)
  return (
    <Style>
      <div className="measurements-tab">
        <div className="measurements-label bold green">
          <span>..</span>
        </div>
        <div style={{width: '100%', borderTop: '1px solid black', paddingTop: '20px'}}>
          <span style={{marginLeft: '20px'}}>Measurements:</span>
          <span style={{fontSize: '-webkit-xxx-large', marginLeft: '20px', textTransform: 'uppercase'}}>{nodeName}</span>
          <div style={{marginLeft: '45px', marginTop: '10px'}}>
            <ul style={{listStyle: 'none', fontWeight: 'bold', color: 'white'}}>
              <li>PM2.5: 
                <span style={styles.spanMeasurements}> {data.pm25 || 'loading...'} </span>
              </li>
              <li>PM10: 
                <span style={styles.spanMeasurements}> {data.pm10 || 'loading...'} </span>
              </li>
              <li>NO2: 
                <span style={styles.spanMeasurements}> {data.no2 || 'loading...'} </span>
              </li>
              <li>SO2: 
                <span style={styles.spanMeasurements}> {data.so2 || 'loading...'} </span>
              </li>
              <li>TEMP: 
                <span style={styles.spanMeasurements}> {data.temp || 'loading...'} </span>
              </li>
              <li>HUMIDITY: 
                <span style={styles.spanMeasurements}> {data.humidity || 'loading...'} </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="cautionary-tab">
        <div style={{alignSelf: 'center', marginTop: '5px', marginBottom: '5px', fontWeight: 'bold', textAlign: 'center', padding: '0 5px'}}>
            <span>Pollutants-Specific Cautionary Statements for</span><br/> 
            <span>the General Public</span>
        </div>
        <div style={{width: '100%', borderTop: '1px solid black', paddingTop: '20px'}}>
          <div style={{marginTop: '10px'}}>
            <img src={HappyFace} alt="happy-face" height="200" width="200" style={{display: 'block', margin: '30px auto'}} />
          </div>
        </div>
      </div>
    </Style>
  )
}

const Style = styled.div`
  .bold {
    font-weight: bold;
  }

  .green {
    color: #1cfc03;
  }

  .measurements-tab {
    display: flex; 
    flex-flow: column; 
    border: 1px solid #1e1e1e; 
    margin-bottom: 10px; 
    height: calc(50% - 5px);
    border-radius: 5px; 
    background: #272727;
  }

  .measurements-label {
    align-self: center; 
    margin-top: 5px; 
    margin-bottom: 5px;
  }

  .cautionary-tab {
    display: flex;
    flex-flow: column; 
    border: 1px solid #1e1e1e; 
    margin-bottom: 10px; 
    height: calc(50% - 5px); 
    border-radius: 5px; 
    background: #272727;
  }
`;

export default AQContent;