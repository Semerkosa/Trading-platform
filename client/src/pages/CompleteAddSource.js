import { useState, useEffect,useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ApplicationRoutes, VERIFY_REQUSITION } from '../ApplicationVariables';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';

const CompleteAddSource = () => {
    const { token } = useContext(UserContext);
    const [searchParams] = useSearchParams();
    const referenceId = searchParams.get('referenceId');
    const userToken=searchParams.get('userToken');
    const [message, setMessage] = useState('');
    const [redirect, setRedirect] = useState(10);
    useEffect(() => {
        async function verifyRequisition() {
            const controller = new AbortController();
            setTimeout(() => controller.abort(), 3000);
            const requestOptions = {
                method: 'GET',
                headers: { 'User-Token': userToken, 'Reference-Id': referenceId },
                signal: controller.signal
            };
            await fetch(VERIFY_REQUSITION, requestOptions)
            .then(response => {
                response.text().then((text) => setMessage(text));
            }).catch((error) => {
                if (error.name === 'AbortError') {
                    alert('Request timeout exceeded! Operation aborted!');
                }else{
                    throw error;
                }
            });
        };
       token===userToken? verifyRequisition():setMessage('Invalid token!');
    }, [referenceId, userToken,token]);

    useEffect(() => {
        let timer = setTimeout(() => {
            setRedirect(redirect - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [redirect]);

    return (
        <div>
            <p>{message}</p>
            <small>You will be redirected in: {redirect}</small>
            {redirect === 0 && (<Navigate to={ApplicationRoutes.Profile_Route} replace={true} />)}
        </div>
    );
};

export default CompleteAddSource;