import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EditableTextboxes = () => {
  
  const [textboxes, setTextboxes] = useState({
    textbox1: 'Lorem ipsum dolor sit amet',
    textbox2: 'Consectetur adipiscing elit',
    textbox3: '19',
    textbox4: 'Mees',
    textbox5: 'eesti keel',
    textbox6: 'vene keel, inglise keel',
    textbox7: 'Sed do eiusmod tempor Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet Lorem ipsum dolor sit amet Sed do eiusmod tempor Lorem ipsum dolor sit ametLorem ipsum dolor sit',
  });
  
  const [isEditable, setIsEditable] = useState(false);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTextboxes((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  
  const toggleEdit = () => {
    setIsEditable((prev) => !prev);
  };

  return (
    <div style={{
      border: '5px solid purple',
      borderRadius: '25px'
  }}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4"> 
      <div className="w-full max-w-md flex flex-start justify-between items-center mb-6">
     
    


        <div style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-start',
            margin: '0.5rem 0',
            width: '200px'
        }}>
            </div> 



             

      
    <div style={{
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
  width: '100%',
  maxWidth: '870px',
  alignItems: 'center'
}}>
  <div style={{ flex: 1 }}>
  <p>Pealkiri</p>
    <input
      type="text"
      id="textbox1"
      name="textbox1"
      value={textboxes.textbox1}
      onChange={handleInputChange}
      disabled={!isEditable}
      className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
    />
  </div>
  <button
    onClick={toggleEdit}
    style={{
      padding: '8px 16px',
      backgroundColor: '#9C27B0',
      color: '#ffffff',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer'
    }}
  >
    {isEditable ? 'Lukusta' : 'Muuda'}
  </button>
</div>

<div style={{
        padding: '26px',
        width: '100%'
        
    }}>

</div>


        <div>
        <p>Ülesande kirjeldus</p>
          <input
            type="text"
            id="textbox2"
            name="textbox2"
            value={textboxes.textbox2}
            onChange={handleInputChange}
            disabled={!isEditable}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
          />
        </div>
        
      </div> {/* / */}

      <div style={{
            padding: '26px',
            width: '100%'
        
             }}></div>

<p>Teksti andmed</p>
<div>

    <div
  
    style={{display: "flex",
            gap: "10px"
                
            }}>
            
                <div>
                <label for="dropdown1">Põhiliik</label>
                <select
                        onChange={handleInputChange}
                        disabled={!isEditable}
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
                        <option value=""  hidden>Akadeemiline</option>
                        <option value="option1">Akadeemiline</option>
                        <option value="option2">Mitteakadeemiline</option>
                        
                    </select>
                    </div>

   
                  <div>
                  <label for="dropdown2" style={{marginBottom: "4px"}}>Valdkond</label>
                    <select
                      onChange={handleInputChange}
                      disabled={!isEditable}
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
                      <option value="" hidden>terviseuuringud</option>
                      <option value="option1">bio- ja keskkonnateadused</option>
                      <option value="option2">ühiskonnateadused ja kultuur</option>
                      <option value="option3">terviseuuringud</option>
                      <option value="option4">loodusteadused ja tehnika</option>
                  </select>
                  </div>

                  <div>
                  <label for="dropdown3" style={{marginBottom: "4px"}}>Kategooria</label>
                  <select
                      onChange={handleInputChange}
                      disabled={!isEditable}
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
                      <option value=""  hidden>Erialaõpingud</option>
                      <option value="option1">Erialaõpingud</option>
                      <option value="option2">Uurimused</option>

                  </select>
                  </div>

                  <div>
                  <label for="dropdown4" style={{marginBottom: "4px"}}>Alamliik</label>
                  <select
                      onChange={handleInputChange}
                      disabled={!isEditable}
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
                      <option value=""  hidden>Essee</option>
                      <option value="option1">Analüüs</option>
                      <option value="option2">Essee</option>
                      <option value="option3">Kursusetöö</option>
                      <option value="option4">Referaat</option>
                      <option value="option4">Retsensioon</option>
                      <option value="option4">Seminaritöö</option>
                      <option value="option4">Ülevaade</option>
                  </select>
                  </div>
                 
            </div>
        </div>

        
        <div style={{
            padding: '26px',
            width: '100%'
        
             }}></div>

            <div>
                <p>Autori andmed</p>
                <div style={{display: "flex",
            gap: "10px"
                
            }} >
                <div>
                <label for="textbox3" style={{marginBottom: "4px"}}>Vanus</label>
          <input
            type="text"
            id="textbox3"
            name="textbox3"
            value={textboxes.textbox3}
            
            disabled={!isEditable}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
          />
        </div>

        <div>
        <label for="textbox4" style={{marginBottom: "4px"}}>Sugu</label>
          <input
            type="text"
            id="textbox4"
            name="textbox4"
            value={textboxes.textbox4}
            
            disabled={!isEditable}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
          />
        </div>

        <div>
        <label for="textbox5" style={{marginBottom: "4px"}}>Emakeel</label>
          <input
            type="text"
            id="textbox5"
            name="textbox5"
            value={textboxes.textbox5}
           
            disabled={!isEditable}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
          />
        </div>

        <div>
        <label for="textbox6" style={{marginBottom: "4px"}}>Muud õppe-, töö- või</label>
            <input
            type="text"
            id="textbox6"
            name="textbox6"
            value={textboxes.textbox6}
            
            disabled={!isEditable}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
          />
        </div>
                </div>
            </div>



            <div style={{
            padding: '26px',
            width: '100%'
        
             }}></div>

            <div>
                <p>Alamkorpus</p>
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
                      <option value="" hidden>K2 riiklikud eksamitööd</option>
                      <option value="option1">K2 riiklikud eksamitööd</option>
                      <option value="option2">K2 olümpiaaditööd</option>
                      <option value="option3">K2 keeleõpe</option>
                      <option value="option4">K1 eesti keel</option>
                      <option value="option4">K1 vene keel</option>
                      <option value="option4">K3 vene keel</option>
                      <option value="option4">Akadeemiline vene keel</option>
                  </select>
                  </div>

<div style={{
            padding: '26px',
            width: '100%'
        
             }}>

</div>

      
        <div>
    <p>Tekst</p>



  <div></div>
  <div style={{
    width: '100%',
    maxWidth: '870px',
    padding: '16px',
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '16px',
    lineHeight: '1.5',
    textAlign: 'left',
    backgroundColor: !isEditable ? '#e5e7eb' : '#fff',
    cursor: !isEditable ? 'not-allowed' : 'text'
  }}>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </div>



</div>




<div style={{
            padding: '26px',
            width: '100%'
        
             }}>

</div>






<div style={{
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  maxWidth: '870px',
  gap: '16px'
}}>
  <div style={{
    display: 'flex',
    gap: '15px'
  }}>
    <button style={{
      padding: '8px 16px',
      backgroundColor: '#9C27B0',
      color: '#ffffff',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px'
    }}>
      Salvesta
    </button>
    <button style={{
      padding: '8px 16px',
      backgroundColor: '#9C27B0',
      color: '#ffffff',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px'
    }}>
      Lisa andmebaasi
    </button>
    <button style={{
      padding: '8px 16px',
      backgroundColor: '#9C27B0',
      color: '#ffffff',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px'
    }}>
    <Link to="/texts-from-database" style={{ margin: '0.5rem 0',  color:'white' }}>
              Tagasi
            </Link>
      
    </button>
  </div>
  <div></div>
  <button style={{
    padding: '8px 16px',
    backgroundColor: '#9C27B0',
    color: '#ffffff',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    marginLeft: 'auto'
  }}>
    Kustuta
  </button>
</div>







    </div>
    </div>
  );
};

export default EditableTextboxes;