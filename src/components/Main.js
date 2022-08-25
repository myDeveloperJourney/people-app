import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Index from '../pages/Index';
import Show from '../pages/Show';
import Home from '../pages/Home';


const PrivateRoute = ({ children, user }) => {
    if(user) {
        return children;
    } else {
        return <Navigate to="/" />
    }
};


function Main({ user }) {
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
    
    const deletePeople = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            
            getPeople();

        } catch (error) {
            // TODO: add logic or task if something goes wrong
        }
    };
    
    
    const updatePeople = async (id, updatedPerson) => {
        try {
            
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'Application/json'
                },
                body: JSON.stringify(updatedPerson)
            });
            
            getPeople();
        } catch (error) {
            // TODO: add logic or task if something goes wrong
        }
    };

    useEffect(() => {
        if(user) {
            getPeople();
        } else {
            setPeople(null);
        }
    }, [ user ]);

    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                    path="/people" 
                    element={
                        <PrivateRoute user={user}>
                            <Index 
                                people={people} 
                                createPeople={createPeople} 
                            />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/people/:id" 
                    element={
                        <PrivateRoute user={user}>
                            <Show 
                                people={people}
                                deletePeople={deletePeople}
                                updatePeople={updatePeople} 
                            />
                        </PrivateRoute>
                    } 
                />
            </Routes>
        </main>
    );
}

export default Main;