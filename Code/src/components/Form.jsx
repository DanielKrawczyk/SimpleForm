import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validate from './validations';

function Form() {
    const [ step, setStep ] = useState(1),
    store = useSelector(state => state.data),
    dispatch = useDispatch();

    // Emoji for spiciness scale
    const emoji = [
        <p>&#128519;</p>, // Not spicy
        <p>&#128526;</p>,
        <p>&#128523;</p>,
        <p>&#128527;</p>,
        <p>&#128528;</p>,
        <p>&#128556;</p>, // Medium spicy
        <p>&#128547;</p>,
        <p>&#128548;</p>,
        <p>&#128520;</p>,
        <p>&#128293;</p> // Very spicy
    ]

    // POSTing data using fetch method
    async function postData(post) {
        if (post === false) return; // If any input is invalid

        document.getElementById('loading').classList.remove('hidden');

        try {
            const res = await fetch('https://frosty-wood-6558.getsandbox.com/dishes', {
                method: 'POST',
                headers: {
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(post)
            })
            const data = res.json();
            console.log(data);
            document.getElementById('loading').classList.add('hidden');

            showInfo('New dish added succesfully!');

        } catch (error) {
            document.getElementById('loading').classList.add('hidden');
            showInfo(`Connection error: ${error}`)
        }
    }

    // Show positive or negative info
    function showInfo(msg) {
        dispatch({
            type: 'NEW_INFO',
            data: msg
        })

        document.getElementById('info').classList.add('show');

        setTimeout(() => {
            document.getElementById('info').classList.remove('show');
        }, 5000)
    }

    // Show proper input after choosing type of dish
    function showProperInputs() {
        switch (store.type) {
            case 'pizza':
                return (
                    <div className="input-group mt-2">
                        <label className="input-group-text" htmlFor="slices">&#127829; Number of slices and diameter:</label>
                        <input className="form-control" type="number" id="slices" min="4" max="16" placeholder="Min 4 slices..." title="Min 4 slices, max 16 slices." onChange={el => {
                            const x = el.target;
                            if (parseInt(x.value) < 4 || parseInt(x.value) > 16) {
                                x.classList.add('is-invalid')
                            } else {
                                x.classList.remove('is-invalid')
                            }
                        }} />
                        <input className="form-control" type="number" id="diameter" min="25" max="60" step="0.1" placeholder="Min 25 cm..." title="Min 25 cm, max 60 cm." onChange={el => {
                            const x = el.target;
                            if (parseFloat(x.value) < 25 || parseFloat(x.value) > 60) {
                                x.classList.add('is-invalid')
                            } else {
                                x.classList.remove('is-invalid')
                            }
                        }} />
                        <label className="input-group-text">cm</label>
                    </div>
                );
            case 'soup':
                return (
                    <div className="text-center mt-4">
                        <h2>
                        <label className="form-label font-amatic" htmlFor="spiciness"><b>Spiciness: </b></label>
                        <input className="form-range" type="range" name="spiciness" id="spiciness" defaultValue="1" min="1" max="10" step="1" onChange={el => setStep(el.target.value)} />
                        <label htmlFor="spiciness">{emoji[step - 1]}</label>    
                        </h2>
                    </div>
                );
            case 'sandwich':
                return (
                    <div className="input-group mt-2">
                        <label className="input-group-text" htmlFor="bread">&#127838; Slices of bread: </label>
                        <input className="form-control" type="number" id="bread" min="1" max="12" placeholder="Min 1 slice of bread..." title="Min 1 slice, max 12 slices" onChange={el => {
                            const x = el.target;
                            if (parseInt(x.value) < 1 || parseInt(x.value) > 12) {
                                x.classList.add('is-invalid')
                            } else {
                                x.classList.remove('is-invalid')
                            }
                        }} />
                    </div>
                )
            default:
                return (
                    <div></div>
                )
        }
    }

    return (
        <div className="d-flex flex-column align-items-center mt-5 p-5">

            <div className="input-group">
                <label htmlFor="name" className="input-group-text sm">&#127836; Dish name: </label>
                <input className="form-control" type="text" id="name" placeholder="Dish name" pattern=".{6,}" title="At least 6 characters is needed." onChange={el => {
                    const x = el.target;
                    if (x.validity.patternMismatch || x.value.length === 0) {
                        x.classList.add('is-invalid')
                    } else {
                        x.classList.remove('is-invalid')
                    }
                }} />
            </div>
            
            <div className="input-group mt-2">
                <label htmlFor="prep" className="input-group-text sm">&#128338; Preparation time: </label>
                <input className="form-control" type="time" step="1" id="prep" title="Proper preparation time is very important!" onChange={el => {
                    const x = el.target;
                    if (x.value === '' || x.value.length < 5 || x.value === "00:00" || x.value === "00:00:00") {
                        x.classList.add('is-invalid');
                    } else {
                        x.classList.remove('is-invalid')
                    }
                }} />
            </div>

            <select className="form-select mt-2" name="type" id="type" defaultValue="info" 
                onChange={e => {
                    dispatch({type:'UPDATE', data: {type: e.target.value}});
                    document.getElementById('btn').classList.remove('disabled')
                }}>
                <option value="info" disabled>Choose type of your dish</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="sandwich">Sandwich</option>
            </select>

            {showProperInputs()}
            
            <button id="btn" className="btn btn-primary mt-5 disabled" onClick={() =>   postData(validate())}>Submit!</button>
        </div>
    )
}

export default Form;