import React, { useState, useEffect } from "react";
import axios from "axios";

export const ShowAll = () => {
    const [entry, setEntry] = useState([]);

    const fetchEntries =  async() => {
        const { status, data } = await axios.get(
            `http://localhost:4000/All`
        );
        if (status === 200) {
            setEntry(data);
        }
    }
        
    const delEntry =  async(id) => {
        const { status, data } = await axios.delete(
            `http://localhost:4000/All/${id}`
        );
        fetchEntries();
    }

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <div >
            <br/><br/><br/>
            <h1 className="matrix">Employee Data</h1>


            {entry.map((entries, index) => (
                <tr>
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
                <button onClick={() => delEntry(entries.id)}>X</button>
                </tr>
            ))}           
         )
        </div>  
    );
}
export default ShowAll