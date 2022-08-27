import { useEffect, useState, useRef } from 'react';
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

    const getPeopleRef = useRef(null);
    
    
    const API_URL = 'https://people-app-api-v1.herokuapp.com/api/people';

    const getPeople = async () => {
        try {
            const token = await user.getIdToken();
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            const data = await response.json();
            setPeople(data);
        } catch (error) {
            // TODO: add logic or task if something goes wrong
        }
    };
    
    const createPeople = async (person) => { 
        try {
            const token = await user.getIdToken();
            await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-type': 'Application/json',
                    'Authorization': 'Bearer ' + token
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
            const token = await user.getIdToken();
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            
            getPeople();

        } catch (error) {
            // TODO: add logic or task if something goes wrong
        }
    };
    
    
    const updatePeople = async (id, updatedPerson) => {
        try {
            const token = await user.getIdToken();
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'Application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(updatedPerson)
            });
            
            getPeople();
        } catch (error) {
            // TODO: add logic or task if something goes wrong
        }
    };

    useEffect(() => {
        getPeopleRef.current = getPeople;
    });

    useEffect(() => {
        if(user) {
            getPeopleRef.current();
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