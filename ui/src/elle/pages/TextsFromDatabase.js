import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const TextsFromDatabase = () => {
  const [tableData, setTableData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [formData, setFormData] = useState({title: ''});
  
    const [checkboxSelections, setCheckboxSelections] = useState({
    choiceX: false,
    choiceY: false
    });
    const [isSecondDropdownOpen, setIsSecondDropdownOpen] = useState(false);
      
  
  
    useEffect(() => {
      const data = [
          { date: "23.03.2025", title: "Lorem ipsum1", mainType: "Lorem ipsum", subType: "Lorem ipsum" },
          { date: "22.03.2025", title: "Lorem ipsum", mainType: "Lorem ipsum", subType: "Lorem ipsum" },
          { date: "21.03.2025", title: "Lorem ipsum", mainType: "Lorem ipsum", subType: "Lorem ipsum" }
        ];
      setTableData(data);
    }, []);
  
  
    const handleFirstDropdownChange = (event) => {
      const value = event.target.value;
      setSelectedOption(value);
        
    };
  
    const handleCheckboxChange = (choice) => {
      setCheckboxSelections((prev) => ({
          ...prev,
          [choice]: !prev[choice]
      }));
    };
    const toggleSecondDropdown = () => {
      setIsSecondDropdownOpen((prev) => !prev);
    };
    const removeSelection = (choice) => {
      setCheckboxSelections((prev) => ({
        ...prev,
        [choice]: false
      }));
    };
  
  
  
    return (
        <div className='nr1' style={{
          fontFamily: 'Arial, sans-serif',
          margin: 0,
          padding: 0,
          backgroundColor: '#f0f0f0',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}>
                
          <div style={{
            display: 'flex',
            flex: 1,
            maxWidth: '1700px',
            margin: '0 auto',
            padding: '2rem'
          }}>
            <div style={{
              width: '200px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}>
              <Link to="/texts-given">
              <p style={{ margin: '0.5rem 0', fontSize: '16px', color:'black' }}>Loovutatud tekstid</p>
              </Link>
              <p style={{ margin: '0.5rem 0', fontSize: '16px' , color:'#9C27B0'}}>Andmebaasi päringud</p>
            </div>
                <div style={{
                    width: '1px',
                    backgroundColor: '#ddd',
                    margin: '0 1rem'
                }}></div>
    
                  <main style={{
                        flex: 1,
                        padding: '1rem',
                        
                    }}>
  

                  <h2>Otsi andmebaasist</h2>
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'flex-start',
                        margin: '0.5rem 0'
                      }}>
                  <select
                      value={selectedOption}
                      onChange={handleFirstDropdownChange}
                      style={{
                          padding: '8px',
                          fontSize: '16px',
                          width: '200px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          backgroundColor: '#fff',
                          cursor: 'pointer'
                      }}
                  >
                      <option value="" disabled hidden>Vali sobiv tunnus</option>
                      <option value="option1">Lisamise aeg</option>
                      <option value="option2">Liik</option>
                      <option value="option3">Alamkorpus</option>
                      <option value="option4">Pealkiri</option>
                  </select>
                           
  







  
              {selectedOption === 'option3' && (
            
          <div style={{
            width: '200px',
            position: 'relative'
        }}>
            <div
                onClick={toggleSecondDropdown}
                style={{
                    padding: '5.9px',
                    fontSize: '16px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    color: Object.values(checkboxSelections).some(val => val) ? '#000' : '#888'
                }}
            >
                {Object.values(checkboxSelections).some(val => val)
                    ? Object.keys(checkboxSelections)
                          .filter(key => checkboxSelections[key])
                          .map(key => key === 'choiceX' ? 'K2 riiklikud eksamitööd' : 
                            key === 'choiceY' ? 'K2 olümpiaaditööd' : key === 'choiceA' ? 'K2 keeleõpe' : 
                            key === 'choiceB' ? 'K1 eesti keel' : key === 'choiceC' ? 'K1 vene keel' : key === 'choiceD' ? 'K3 vene keel' :
                            key === 'choiceE' ? 'Akadeemiline vene keel' : 'Valik Z')

                          .join(', ')
                    : 'Vali alamkorpus'}
            </div>
            {isSecondDropdownOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '100%',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    zIndex: 10
                }}>
                    <label style={{
                        display: 'block',
                        padding: '8px',
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}>
                        <input
                            type="checkbox"
                            checked={checkboxSelections.choiceX}
                            onChange={() => handleCheckboxChange('choiceX')}
                            style={{ marginRight: '8px' }}
                        />
                        K2 riiklikud eksamitööd
                    </label>
                    <label style={{
                        display: 'block',
                        padding: '8px',
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}>
                        <input
                            type="checkbox"
                            checked={checkboxSelections.choiceY}
                            onChange={() => handleCheckboxChange('choiceY')}
                            style={{ marginRight: '8px' }}
                        />
                        K2 olümpiaaditööd
                    </label>
                    <label style={{
                        display: 'block',
                        padding: '8px',
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}>
                        <input
                            type="checkbox"
                            checked={checkboxSelections.choiceA}
                            onChange={() => handleCheckboxChange('choiceA')}
                            style={{ marginRight: '8px' }}
                        />
                        K2 keeleõpe
                    </label>
                    <label style={{
                        display: 'block',
                        padding: '8px',
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}>
                        <input
                            type="checkbox"
                            checked={checkboxSelections.choiceB}
                            onChange={() => handleCheckboxChange('choiceB')}
                            style={{ marginRight: '8px' }}
                        />
                        K1 eesti keel
                    </label>
                    <label style={{
                        display: 'block',
                        padding: '8px',
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}>
                        <input
                            type="checkbox"
                            checked={checkboxSelections.choiceC}
                            onChange={() => handleCheckboxChange('choiceC')}
                            style={{ marginRight: '8px' }}
                        />
                        K1 vene keel
                    </label>
                    <label style={{
                        display: 'block',
                        padding: '8px',
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}>
                        <input
                            type="checkbox"
                            checked={checkboxSelections.choiceD}
                            onChange={() => handleCheckboxChange('choiceD')}
                            style={{ marginRight: '8px' }}
                        />
                        K3 vene keel
                    </label>
                    <label style={{
                        display: 'block',
                        padding: '8px',
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}>
                        <input
                            type="checkbox"
                            checked={checkboxSelections.choiceE}
                            onChange={() => handleCheckboxChange('choiceE')}
                            style={{ marginRight: '8px' }}
                        />
                        Akadeemiline vene keel
                    </label>
                    
                  
                </div>
            )}
        </div>
  
            )}
         {selectedOption === 'option' && (
              <select
              style={{
                  padding: '8px',
                  fontSize: '16px',
                  width: '200px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                  cursor: 'pointer'
              }}
          >
              <option value="">Vali valik</option>
              <option value="choiceX">Valik X</option>
              <option value="choiceY">Valik Y</option>
              <option value="choiceZ">Valik Z</option>
          </select>
                          )}


          {selectedOption === 'option4' && (
          <div style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start'
          }}>
              <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
              }}>
                  <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      style={{
                          padding: '8px',
                          fontSize: '16px',
                          width: '200px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          backgroundColor: '#fff'
                      }}
                      placeholder="Pealkiri"
                  />
                      </div>

                      <button
                  onClick={() => console.log('Form submitted:', formData)}
                  style={{
                      padding: '8px 16px',
                      fontSize: '16px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      backgroundColor: '#333',
                      color: 'white',
                      cursor: 'pointer',
                      alignSelf: 'flex-start'
                  }}
              >
                  Otsi pealkirja järgi
              </button>
          </div>
      )}
  </div>
  
  
                      <table style={{
                          width: '100%',
                          borderCollapse: 'collapse',
                          margin: '20px 0'
                      }}>
  
                          <thead>
                              <tr>
                                  <th style={{
                                      border: '1px solid #ddd',
                                      padding: '8px',
                                      textAlign: 'left',
                                      backgroundColor: '#333',
                                      color: 'white'
                                  }}>Lisamise Aeg</th>
                                  <th style={{
                                      border: '1px solid #ddd',
                                      padding: '8px',
                                      textAlign: 'left',
                                      backgroundColor: '#333',
                                      color: 'white'
                                  }}>Pealkiri</th>
                                  <th style={{
                                      border: '1px solid #ddd',
                                      padding: '8px',
                                      textAlign: 'left',
                                      backgroundColor: '#333',
                                      color: 'white'
                                  }}>Põhiliik</th>
                                  <th style={{
                                      border: '1px solid #ddd',
                                      padding: '8px',
                                      textAlign: 'left',
                                      backgroundColor: '#333',
                                      color: 'white'
                                  }}>Alamliik</th>
                              </tr>
                          </thead>
                          <tbody>
                              {tableData.map((item, index) => (
                                  <tr key={index} style={index % 2 === 0 ? {} : { backgroundColor: '#f2f2f2' }}>
                                      <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{item.date}</td>
                                      <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{item.title}</td>
                                      <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{item.mainType}</td>
                                      <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{item.subType}</td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </main>
              </div>
          </div>
      );
  };
  
  
  
  
export default TextsFromDatabase;