import React, { useState, useEffect } from "react";
import DatePicker from 'react-date-picker';
import axios from "axios";

export const Update = () => {
    const [entry, setEntry] = useState([]);
    const [bool, setBool] = useState(false);
    const [date, setDate] = useState(new Date());
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [editBool, setEditBool] = useState(false);
    const [ID, setID] = useState([]);

    const fetchEntries =  async() => {

        const { status, data } = await axios.get(
            `http://localhost:4000/All`
        );
        if (status === 200) {
            setEntry(data);
        }
    }

    const initialEntryState = {
        "id": null,
        "last_name": "",
        "first_name": "",
        "is_online": false,
        "date": null
      };
      const [entryNew, setEntryNew] = useState(initialEntryState);

      const onChangeFirstName = (event) => {
        setFirstName(event.target.value);
      };

      const onChangeLastName = (event) => {
        setLastName(event.target.value);
      };

    const handleEdit =(entry_) => {
        setEditBool(true);
        setID(entry_.id);
        setEntryNew(entry_);
        setFirstName(entry_.first_name);
        setLastName(entry_.last_name);
        setBool(entry_.is_active);
        setDate(entry_.date_of_birth);
    }
    const updateEntry =  async(id) => {
        const { status, data } = await axios.put(
            `http://localhost:4000/All/${id}`,
            {
                "last_name": lastName,
                "first_name": firstName,
                "is_active": bool,
                "date_of_birth": date
              }
        );
        fetchEntries();
        setEditBool(false);        
    }

        useEffect(() => {
            fetchEntries();
          }, []);

        return (

        <div>
            <>
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

                <h1 id='title'>Employee Data</h1>
                {entry.map((entries, index) => (
                    <tr id='matrix'>
                    <td>{index+1}</td>
                    <td>{entries.id}</td>
                    <td>{entries.first_name}</td>
                    <td>{entries.last_name}</td>
                    <td>{entries.date_of_birth}</td>
                    <input
                    name="IsActive"
                    type="checkbox"
                    checked={entries.is_active
                    }/>
                    <button onClick={() => handleEdit(entries)}>Edit</button>

                    </tr>
                ))} 
            </div> 
            <br/>
 
            <div class="float-child">

                {editBool === false ?
                    null
                        : 
                <React.Fragment>

                            
                    <br />
                    <br />
                    <br />
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">First Name: </label>
                            <input
                            type="text"

                            value={firstName}
                            onChange={onChangeFirstName}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Last Name:  </label>
                            <input
                            type="text"

                            value={lastName}
                            onChange={onChangeLastName}
                            />
                        </div>
                        <br />
                        <div>
                            <DatePicker
                                onChange={setDate}
                                value={date}
                                disableCalendar = {true}
                            />
                        </div>
                        <br />

                        <label>
                            Is Active:
                            <input
                                name="IsActive"
                                type="checkbox"
                                checked={bool}
                                onChange={() => setBool(!bool)}/>
                        </label>
                        <br />
                        <br />

                        <button onClick={(e) => updateEntry(ID)}>Submit</button>

                        
                    </form>
                    <br />


                </React.Fragment>}
            </div>          

              </>      
        </div> 
            
        );
    }
    export default Update