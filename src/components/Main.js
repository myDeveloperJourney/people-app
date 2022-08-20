import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '../pages/Index';
import Show from '../pages/Show';

function Main(props) {
    const [ people, setPeople ] = useState(null); 
    
    const API_URL = 'http://localhost:4000/api/people';

    const getPeople = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setPeople(data);
        } catch (error) {
            // TODO: add logic or task if something goes wrong
        }
    };
    
    const createPeople = async (person) => { 
        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-type': 'Application/json'
                },
                body: JSON.stringify(person)
            });
            getPeople(); // update our state with the updated array of objects
            // we're doing this after a new object is created
        } catch (error) {
            // TODO: add logic or task if something goes wrong
        }
    };

    useEffect(() => {
        getPeople();
    }, []);

    return (
        <main>
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <Index 
                            people={people} 
                            createPeople={createPeople} 
                        />
                    } 
                />
                <Route path="/people/:id" element={<Show />} />
            </Routes>
        </main>
    );
}

export default Main;