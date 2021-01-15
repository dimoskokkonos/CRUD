import React, { useState } from "react";
import DatePicker from 'react-date-picker';
import axios from "axios";
import "../styles/mystyle.module.css"

export const Add = () => {
    const [bool, setBool] = useState(false);
    const [date, setDate] = useState(new Date());
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [check, setCheck] = useState(false);

    const onChangeFirstName = (event) => {
        setFirstName(event.target.value);
    };

    const onChangeLastName = (event) => {
        setLastName(event.target.value);
    };

    const postEntry =  async(id) => {

        setCheck(true);

        await axios.post(
            `http://localhost:4000/All`,
            {
                "last_name": lastName,
                "first_name": firstName,
                "is_active": bool,
                "date_of_birth": date
        })
        
    }


    return (
        
        <div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
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
                    <label htmlFor="title">Last Name: </label>
                    <input
                        name="LastName"
                        type="text"
                        value={lastName}
                        onChange={onChangeLastName}/>
                </div>
                <br />

                <div>
                    <label>
                        Is Active:
                        <input
                            name="IsActive"
                            type="checkbox"
                            checked={bool}
                            onChange={() => setBool(!bool)}/>
                    </label>
                </div>
                <br />

                <div>
                    <DatePicker
                    onChange={setDate}
                    value={date}
                    />
                </div>
                <br />
                <button className="myButton" onClick={() => postEntry()}>Add Employee</button>
            </form>
            <br />

            <div> 
                {check === false ?
                    null
                        : 
                    <h2>Added Employee!</h2>
                }
            </div>
        </div>
    );
}
export default Add