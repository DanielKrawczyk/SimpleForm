import { useSelector } from 'react-redux';

function Info() {
    const info = useSelector(state => state.info);

    return (
        <div id="info" className="info font-amatic">
            <h3>
                {info}
            </h3>
        </div>
    )
}

export default Info;