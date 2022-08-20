import { Link } from 'react-router-dom';

function Index({ people }) {
    
    const loaded = () => {
        return people.map(({ name, _id }) => {
            return (
                <div className="person" key={_id}>
                    <Link to={`/people/${_id}`}>
                        <h1>{name}</h1>
                    </Link>
                </div>
            )
        })
    };
    
    const loading = () => {
        return <h1>Loading ...</h1>
    };
    
    
    return people ? loaded() : loading();
}


export default Index;