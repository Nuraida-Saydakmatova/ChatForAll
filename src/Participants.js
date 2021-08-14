import React, { useEffect , useState, useContext} from 'react';
import requester from './Components/utils/requester';
import { UserContext, LanguageContext } from './Components/contexts';
import { GrUser } from "react-icons/gr";
import { FiArrowLeft } from "react-icons/fi";

const Participants = () => {
    const [person, setPerson] = useState([]);
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        requester.get('/user')
        .then((res) => {
            setPerson(res.data.payload);
            console.log(person);
            console.log(res.data.payload);
        })
    }, []);

    const exitHandler = () => {
        setUser(null)
    }


    return (
        <>
        <div className={'main_letter'}>
        
        <h1 >Participants({person.length})</h1>
        <FiArrowLeft onClick={() => exitHandler()} style={{ color: 'white', fontSize: '35px' }} />
        </div>
        <img   className={'img1'} src="https://image.freepik.com/free-vector/illustration-with-group-of-people-talking_52683-30141.jpg"></img>
        {person.map((v) => {
            return(
                <div className={'names'}>
                    <div className={'user'}>
                        <img src= { user ? v.picture.url.original : ''}></img>
                    <GrUser style={{fontSize:'20px'}}/>
                    </div>
                <h2>{v.full_name}</h2>
                {v.images}
                </div>
            )
        })}
        </>
    )
}
export default Participants;